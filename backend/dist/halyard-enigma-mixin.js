/**
 * halyard.js v1.3.2
 * Copyright (c) 2019 QlikTech International AB
 * This library is licensed under MIT - See the LICENSE file for full details
 */

(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  /**
   * @public
   * @param {{qThousandSep: string, qDecimalSep: string, qMoneyThousandSep: string, qMoneyDecimalSep: string, qMoneyFmt: string,
   * qTimeFmt: string, qDateFmt: string, qTimestampFmt: string, qFirstWeekDay: string, qReferenceDay: string,
   * qFirstMonthOfYear: string, qCollation: string, qMonthNames: string,
   * qLongMonthNames: string, qDayNames: string, qLongDayNames: string }} localInfoData
   * @returns {{ThousandSep: string, DecimalSep: string, MoneyThousandSep: string, MoneyDecimalSep: string,
   * MoneyFormat: string, TimeFormat: string, DateFormat: string, TimestampFormat: string, FirstWeekDay: string,
   * ReferenceDay: string, FirstMonthOfYear: string, CollationLocale: string, MonthNames: string, LongMonthNames: string,
   * DayNames: string, LongDayNames: string}}
   */
  function convertQixGetLocalInfo(localInfoData) {
    return {
      ThousandSep: localInfoData.qThousandSep,
      DecimalSep: localInfoData.qDecimalSep,
      MoneyThousandSep: localInfoData.qMoneyThousandSep,
      MoneyDecimalSep: localInfoData.qMoneyDecimalSep,
      MoneyFormat: localInfoData.qMoneyFmt,
      TimeFormat: localInfoData.qTimeFmt,
      DateFormat: localInfoData.qDateFmt,
      TimestampFormat: localInfoData.qTimestampFmt,
      FirstWeekDay: localInfoData.qFirstWeekDay,
      ReferenceDay: localInfoData.qReferenceDay,
      FirstMonthOfYear: localInfoData.qFirstMonthOfYear,
      CollationLocale: localInfoData.qCollation,
      MonthNames: localInfoData.qCalendarStrings.qMonthNames,
      LongMonthNames: localInfoData.qCalendarStrings.qLongMonthNames,
      DayNames: localInfoData.qCalendarStrings.qDayNames,
      LongDayNames: localInfoData.qCalendarStrings.qLongDayNames
    };
  }

  var CONNECTION_ERROR = 'Connection Error';
  var LOADING_ERROR = 'Loading Error';
  var SYNTAX_ERROR = 'Syntax Error';
  /**
   * Create error message
   * @private
   * @param {string} errorType
   * @param {object} qixError
   * @param {(Table|HyperCube)} item
   * @returns {{type: string, message: string, item: object, qixError: string}}
   */

  function createErrorMessage(errorType, qixError, item) {
    return {
      type: errorType,
      message: qixError.message || qixError.qErrorString,
      item: item,
      qixError: qixError
    };
  }

  var halyardMixin = {
    types: 'Global',
    init: function init(args) {
      if (args.config) {
        args.api.Promise = args.config.Promise;
      } else {
        args.api.Promise = args.Promise;
      }
    },
    extend: {
      /**
       * Creates a session app based on the model in the halyard instance
       * @public
       * @param {Halyard} halyard - A halyard instance
       * @returns {Promise.<TResult>}
       */
      
      createSessionAppUsingHalyard: function createSessionAppUsingHalyard(halyard) {
        var that = this;
        return that.createSessionApp().then(function (app) {
          return that.setScriptAndReloadWithHalyard(app, halyard, false);
        });
      },
      

      /**
       * Creates an app with the model in the halyard instance.
       * @public
       * @param {string} appName
       * @param {Halyard} halyard
       * @returns {Promise.<TResult>}
       */
      createAppUsingHalyard: function createAppUsingHalyard(appName, halyard) {
        var that = this;
        return that.createApp(appName).then(function (app) {
          var appId = app.qAppId;
          return that.openDoc(appId).then(function (result) {
            return that.setScriptAndReloadWithHalyard(result, halyard, true);
          });
        });
      },

      /**
       * Reloads an existing app with the model in the halyard instance. Can also create an app is createIfMissing is set to true.
       * @public
       * @param {string} existingAppName
       * @param {Halyard} halyard
       * @param {boolean} createIfMissing
       * @returns {Promise.<TResult>}
       */
      reloadAppUsingHalyard: function reloadAppUsingHalyard(existingAppName, halyard, createIfMissing) {
        var that = this;
        return that.openDoc(existingAppName).catch(function (error) {
          var COULD_NOT_FIND_APP = 1003;

          if (createIfMissing && error.code === COULD_NOT_FIND_APP) {
            return that.createApp(existingAppName).then(function (app) {
              return that.openDoc(app.qAppId);
            });
          }

          return that.Promise.reject(error);
        }).then(function (result) {
          return that.setScriptAndReloadWithHalyard(result, halyard, true);
        });
      },

      /**
       * Use the model in halyard to set the script of an app and save it
       * @public
       * @param {object} app
       * @param {Halyard} halyard
       * @param {boolean} doSaveAfterReload
       * @returns {Promise.<TResult>}
       */
      setScriptAndReloadWithHalyard: function setScriptAndReloadWithHalyard(app, halyard, doSaveAfterReload) {
        var that = this;
        var deferredConnections = [];
        halyard.getConnections().forEach(function (connection) {
          var qixConnectionObject = connection.getQixConnectionObject();

          if (qixConnectionObject) {
            var connectionPromise = app.createConnection(qixConnectionObject).then(function (result) {
              return result;
            }, function (err) {
              var LOCERR_CONNECTION_ALREADY_EXISTS = 2000; // Will not throw error if connection already exists.
              // The connections guid makes the connections unique and we assumes that it
              // is the same that was previously created

              if (!(err.code && err.code === LOCERR_CONNECTION_ALREADY_EXISTS)) {
                throw createErrorMessage(CONNECTION_ERROR, err, connection);
              }
            });
            deferredConnections.push(connectionPromise);
          }
        });
        return that.Promise.all(deferredConnections).then(function () {
          return app.getLocaleInfo().then(function (localeInfoResult) {
            halyard.setDefaultSetStatements(convertQixGetLocalInfo(localeInfoResult), true);
            return app.globalApi.configureReload(true, true, false).then(function () {
              return app.setScript(halyard.getScript()).then(function () {
                return app.doReload().then(function () {
                  return app.globalApi.getProgress(0).then(function (progressResult) {
                    if (progressResult.qErrorData.length !== 0) {
                      return app.checkScriptSyntax().then(function (syntaxCheckData) {
                        if (syntaxCheckData.length === 0) {
                          throw createErrorMessage(LOADING_ERROR, progressResult.qErrorData[0]);
                        } else {
                          var item = halyard.getItemThatGeneratedScriptAt(syntaxCheckData[0].qTextPos);
                          throw createErrorMessage(SYNTAX_ERROR, progressResult.qErrorData[0], item);
                        }
                      });
                    }

                    if (doSaveAfterReload) {
                      return app.doSave().then(function () {
                        return app;
                      });
                    }

                    return app;
                  });
                });
              });
            });
          });
        });
      }
    }
  };
  var exposeGlobalApi = {
    types: 'Doc',
    init: function init(args) {
      var getObjectArgs = {
        handle: -1,
        id: 'Global',
        type: 'Global'
      };

      if (args.config) {
        getObjectArgs.genericType = 'Global';
      } else {
        getObjectArgs.customType = 'Global';
        getObjectArgs.delta = true;
      }

      args.api.globalApi = args.api.session.getObjectApi(getObjectArgs);
    }
  };
  module.exports = [halyardMixin, exposeGlobalApi];

}));
//# sourceMappingURL=halyard-enigma-mixin.js.map
