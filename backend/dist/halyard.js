/**
 * halyard.js v1.3.2
 * Copyright (c) 2019 QlikTech International AB
 * This library is licensed under MIT - See the LICENSE file for full details
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.halyard = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  /**
   * Get folder path from file path
   * @private
   * @param {string} path
   * @returns {string}
   */
  function folderPath(path) {
    var folderPathMatch = path.match(/^(.*)(\\.*\..*$|\\.*)$/);

    if (folderPathMatch) {
      return folderPathMatch[1];
    } // Unix file path check


    folderPathMatch = path.match(/^(.*)(\/.*\..*$|\/.*)$/);
    return folderPathMatch && folderPathMatch[1];
  }
  /**
   * Get file name from file path
   * @private
   * @param {string} path
   * @returns {string}
   */

  function fileName(path) {
    var fileNameMatch = path.match(/^.*\\(.*\..*|.*)$/);

    if (fileNameMatch) {
      return fileNameMatch[1];
    }

    fileNameMatch = path.match(/^.*\/(.*\..*|.*)$/);
    return fileNameMatch && fileNameMatch[1];
  }
  /**
   * Get file extension from file path
   * @private
   * @param {string} path
   * @returns {string}
   */

  function fileExtension(path) {
    var fileExtensionMatch = path.match(/^.*\.(.*)$/);
    return fileExtensionMatch && fileExtensionMatch[1];
  }
  /**
   * Escape text with double quotes
   * @private
   * @param {string} text
   * @returns {string}
   */

  function escapeText(text) {
    return text.replace(/"/g, '""');
  }
  /**
   * Get a unique name
   * @private
   * @returns {string}
   */

  function uniqueName() {
    /* eslint no-bitwise: ["off"] */

    /* eslint no-mixed-operators: ["off"] */
    return 'xxxxx-8xxxx-yxxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }
  /**
   * Validate the field type
   * @private
   * @param {string} type
   * @returns {boolean}
   */

  function validFieldType(type) {
    var validFieldTypes = ['time', 'timestamp', 'date', 'interval'];
    type = type || '';
    return validFieldTypes.indexOf(type.toLowerCase()) > -1;
  }
  /**
   * Get indentation characters
   * @private
   * @returns {string}
   */

  function indentation() {
    return '  ';
  }
  /**
   * Get the field name
   * @private
   * @param {Field} field
   * @returns {string}
   */

  function getFieldName(field) {
    return field.name || field.src;
  }

  /**
   * A base set of methods used by Connections
   * @typedef {object} Connection
   * @property {string} path - The Path to a resource
   * @property {string} connectionType - The type can be either 'folder' or 'internet'
   */

  var ConnectionBase =
  /*#__PURE__*/
  function () {
    /**
     * A base set of methods used by Connections
     * @public
     * @param {string} path - The Path to a resource
     * @param {string} connectionType - The type can be either 'folder' or 'internet'
     * @class
     */
    function ConnectionBase(path, connectionType) {
      _classCallCheck(this, ConnectionBase);

      this.path = path;
      this.connectionType = connectionType;
      this.fileExtension = '';
    }
    /**
     * Returns specified file extension.
     * @public
     * @returns {string}
     */


    _createClass(ConnectionBase, [{
      key: "getFileExtension",
      value: function getFileExtension() {
        return this.fileExtension;
      }
      /**
       * Get specified connection type.
       * @public
       * @returns {string}
       */

    }, {
      key: "getConnectionType",
      value: function getConnectionType() {
        return this.connectionType;
      }
      /**
       * Get the QIX representation of a connection.
       * @public
       * @returns {{qName: (string), qConnectionString: (string), qType: (string)}}
       */

    }, {
      key: "getQixConnectionObject",
      value: function getQixConnectionObject() {
        return {
          qName: this.getName(),
          qConnectionString: this.path,
          qType: this.getConnectionType()
        };
      }
      /**
       * Get the name and if nothing is set then it will receive a unique name
       * @public
       * @returns {string}
       */

    }, {
      key: "getName",
      value: function getName() {
        if (!this.name) {
          this.name = uniqueName();
        }

        return this.name;
      }
      /**
       * Get the lib statement used in the load script to connect to a connection
       * @public
       * @returns {string}
       */

    }, {
      key: "getLibStatement",
      value: function getLibStatement() {
        return "lib://".concat(this.getName());
      }
      /**
       * Get the load script for this connection
       * @public
       * @returns {string}
       */

    }, {
      key: "getScript",
      value: function getScript() {
        return "FROM [".concat(this.getLibStatement(), "]");
      }
    }]);

    return ConnectionBase;
  }();

  var FileConnection =
  /*#__PURE__*/
  function (_ConnectionBase) {
    _inherits(FileConnection, _ConnectionBase);

    /**
     * File Connection representation. It will create a folder connection in QIX.
     * @public
     * @param {string} path - Absolute file path
     * @constructor
     */
    function FileConnection(path) {
      var _this;

      _classCallCheck(this, FileConnection);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(FileConnection).call(this, folderPath(path), 'folder'));
      _this.fileName = fileName(path);
      _this.fileExtension = fileExtension(path) || 'txt';
      return _this;
    }
    /**
     * Get the lib statement for the specified file path
     * @public
     * @returns {string}
     */


    _createClass(FileConnection, [{
      key: "getLibStatement",
      value: function getLibStatement() {
        return "".concat(_get(_getPrototypeOf(FileConnection.prototype), "getLibStatement", this).call(this), "/").concat(this.fileName);
      }
    }]);

    return FileConnection;
  }(ConnectionBase);

  var WebFileConnection =
  /*#__PURE__*/
  function (_ConnectionBase) {
    _inherits(WebFileConnection, _ConnectionBase);

    /**
     * Web file connector structure. It will setup everything to create a QIX internet connection.
     * @public
     * @param {string} url
     * @param {string} fileExtension
     */
    function WebFileConnection(url, fileExtension) {
      var _this;

      _classCallCheck(this, WebFileConnection);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(WebFileConnection).call(this, url, 'internet'));
      var fileExtensionMatch = url.match(/^https?:\/\/.*\/.*\.(\w*)\?.*$/) || url.match(/^https?:\/\/.*\/.*\.(\w*)$/);
      _this.fileExtension = fileExtension || fileExtensionMatch && fileExtensionMatch[1] || 'html';
      return _this;
    }

    return WebFileConnection;
  }(ConnectionBase);

  var InlineData =
  /*#__PURE__*/
  function (_ConnectionBase) {
    _inherits(InlineData, _ConnectionBase);

    /**
     * Inline data representation. This is typically CSV formatted data.
     * @public
     * @param {string} data
     * @constructor
     */
    function InlineData(data) {
      var _this;

      _classCallCheck(this, InlineData);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(InlineData).call(this));
      _this.data = data;
      _this.fileExtension = 'txt';
      return _this;
    }
    /**
     * Get the load script representation
     * @public
     * @returns {string}
     */


    _createClass(InlineData, [{
      key: "getScript",
      value: function getScript() {
        return "INLINE \"\n".concat(escapeText(this.data), "\n\"");
      }
      /**
       * Get lib statement but there are none for inline data
       * @private
       */

    }, {
      key: "getLibStatement",
      value: function getLibStatement() {}
      /**
       * Get the QAE connection object but there are none for inline data
       * @private
       */

    }, {
      key: "getQixConnectionObject",
      value: function getQixConnectionObject() {}
    }]);

    return InlineData;
  }(ConnectionBase);

  /**
   * Default set of Connections that are available
   * @constant
   * @type {object}
   */

  var Connections = {
    File: FileConnection,
    Web: WebFileConnection,
    Inline: InlineData
  };

  /**
   * Escape values containing delimiter
   * @private
   * @param {string} data
   * @param {string} delimiter
   * @returns {string}
   */
  function escapeValueContainingDelimiter(data, delimiter) {
    if (data && typeof data === 'string' && (data.indexOf(delimiter) > -1 || data.indexOf('\n') > -1)) {
      return "\"".concat(data.replace(/"/g, '""').replace(/\n/g, ' '), "\"");
    }

    return data;
  }
  /**
   * Convert array date to a string in a csv format
   * @private
   * @param {array} data
   * @returns {string}
   */


  function convert(data) {
    if (data instanceof Array === false) {
      data = [data];
    }

    var csv = '';
    var delimiter = ',';
    var headers = Object.keys(data[0]);
    csv = "".concat(csv + headers.map(function (header) {
      return escapeValueContainingDelimiter(header, delimiter);
    }).join(delimiter), "\n");
    var fields = [];

    for (var i = 0; i < data.length; i += 1) {
      fields = [];

      for (var j = 0; j < headers.length; j += 1) {
        fields.push(escapeValueContainingDelimiter(data[i][headers[j]], delimiter));
      }

      csv = "".concat(csv + fields.join(delimiter), "\n");
    }

    csv = csv.slice(0, -'\n'.length);
    return csv;
  }
  /**
   * Validate that the data is an JSON array
   * @private
   * @param {array} data
   * @returns {boolean}
   */

  function isJson(data) {
    if (data instanceof Array) {
      if (data[0] && _typeof(data[0]) === 'object') {
        return true;
      }
    }

    return false;
  }

  var ConnectionLookup =
  /*#__PURE__*/
  function () {
    /**
     * Utility to add a matching function and a connection type to make it easier to implicitly choose a connection
     * @private
     * @constructor
     */
    function ConnectionLookup() {
      _classCallCheck(this, ConnectionLookup);

      this.connectionsRegistry = [];
    }
    /**
     * Connection matching callback to identify which connection to use for an implicitly declared source.
     * @callback connectionMatchingCallback
     * @param {string} data - Url, file path, csv data
     * @returns {Connection}
     */

    /**
     * Add a matching function with a connection instance
     * @private
     * @param {connectionMatchingCallback} matchingFn - Matching function to decide what connection function to invoke
     * @param {Connection} connection - Callback that returns a Connection instance
     */


    _createClass(ConnectionLookup, [{
      key: "addConnection",
      value: function addConnection(matchingFn, connection) {
        this.connectionsRegistry.push({
          matchingFn: matchingFn,
          connection: connection
        });
      }
      /**
       * Find a match for connection based on the input data
       * @private
       * @param {string} data - The data can be an Url, a file path or a csv data blob
       * @returns {object}
       */

    }, {
      key: "findMatch",
      value: function findMatch(data) {
        for (var i = 0; i < this.connectionsRegistry.length; i += 1) {
          if (this.connectionsRegistry[i].matchingFn(data)) {
            return this.connectionsRegistry[i].connection(data);
          }
        }

        return data;
      }
    }]);

    return ConnectionLookup;
  }();

  var connectionMatcher = new ConnectionLookup(); // url to a table file

  connectionMatcher.addConnection(function (data) {
    return typeof data === 'string' && data.match(/^https?:\/\/(.*)$/g);
  }, function (data) {
    return new Connections.Web(data);
  }); // Path to a table file

  connectionMatcher.addConnection(function (data) {
    return typeof data === 'string' && data.match(/^.*\.(.*)$/g);
  }, function (data) {
    return new Connections.File(data);
  }); // Inline JSON table to csv

  connectionMatcher.addConnection(function (data) {
    return data instanceof Array && isJson(data);
  }, function (data) {
    return new Connections.Inline(convert(data));
  }); // Inline csv table

  connectionMatcher.addConnection(function (data) {
    return typeof data === 'string';
  }, function (data) {
    return new Connections.Inline(data);
  });

  /**
   * Validates supported character sets
   * @private
   * @param {string} characterSet
   * @returns {boolean|string}
   */

  function supportedCharacterSet(characterSet) {
    var validCharacterSets = ['utf8', 'unicode', 'ansi', 'oem', 'mac'];
    return validCharacterSets.indexOf(characterSet) > -1 && characterSet || Number(characterSet).toString() !== 'NaN' && "codepage is ".concat(characterSet);
  }
  /**
   * Get the QIX specific format of a file
   * @private
   * @param {{ fileExtension: string, headerRowNr: number, delimiter: string, characterSet: string, srcTable: string, noLabels: boolean }} options
   * @returns {string}
   */


  function formatSpecification(options) {
    if (!options) {
      options = {};
    }

    var formatSpecificationArr = [];

    if (options.fileExtension) {
      var fileFormat = options.fileExtension;

      if (fileFormat === 'xlsx') {
        fileFormat = 'ooxml';
      }

      if (fileFormat === 'csv') {
        fileFormat = 'txt';
      }

      if (fileFormat === 'htm') {
        fileFormat = 'html';
      }

      formatSpecificationArr.push(fileFormat);
    }

    if (options.headerRowNr || options.headerRowNr === 0) {
      formatSpecificationArr.push("header is ".concat(options.headerRowNr, " lines")); // Should be included if header row is specified!

      formatSpecificationArr.push('embedded labels');
    }

    if (options.delimiter) {
      formatSpecificationArr.push("delimiter is '".concat(options.delimiter, "'"));
    }

    if (options.characterSet && supportedCharacterSet(options.characterSet)) {
      formatSpecificationArr.push(supportedCharacterSet(options.characterSet));
    }

    if (options.srcTable) {
      formatSpecificationArr.push("table is \"".concat(escapeText(options.srcTable), "\""));
    }

    if (options.noLabels) {
      formatSpecificationArr.push('no labels');
    }

    var formatSpecificationString = '';

    if (formatSpecificationArr.length > 0) {
      formatSpecificationString = "\n(".concat(formatSpecificationArr.join(', '), ")");
    }

    return formatSpecificationString;
  }

  var Table =
  /*#__PURE__*/
  function () {
    /**
     * Table definition
     * @public
     * @class
     * @param {Connection} connection
     * @param {object} options - Table options
     * @param {string} options.name - Table name
     * @param {Field[]} options.fields - Array of field objects
     * @param {string} options.prefix - Add prefix before the table
     * @param {string} options.section - Section to add table to
     * @constructor
     */
    function Table(connection, options) {
      _classCallCheck(this, Table);

      this.connection = connectionMatcher.findMatch(connection);
      options = options || {};

      if (typeof options === 'string') {
        this.name = options;
        options = {};
      } else {
        this.name = options.name;
        this.fields = options.fields;
        this.prefix = options.prefix;

        if (options.section) {
          this.section = options.section;
        }
      }

      this.options = options;
    }
    /**
     * @typedef {object} Field
     * @public
     * @property {string} src - Name in the data source of the field
     * @property {string} name - Name after reload
     * @property {string} type - Date, Time, TimeStamp
     * @property {string} inputFormat - Input format to explain how a field should be parsed.
     * @property {string} displayFormat - Display format that should be used after reload.
     * @property {string} expr - Customize how this field should be loaded with Qlik Script.
     */

    /**
     * Get the fields from a table
     * @public
     * @returns {Field[]} Array of fields
     */


    _createClass(Table, [{
      key: "getFields",
      value: function getFields() {
        return this.fields;
      }
      /**
       * Get the script representation of the field list. If nothing is specified than all the fields will be returned.
       * @public
       * @returns {string}
       */

    }, {
      key: "getFieldList",
      value: function getFieldList() {
        if (this.fields) {
          return this.fields.map(function (field) {
            var formattedInput = "\"".concat(escapeText(field.src || ''), "\"");

            if (validFieldType(field.type)) {
              var format = field.type.toUpperCase();

              if (field.inputFormat) {
                formattedInput = "".concat(format, "#(").concat(formattedInput, ", '").concat(field.inputFormat, "')");
              }

              if (field.displayFormat) {
                formattedInput = "".concat(format, "(").concat(formattedInput, ", '").concat(field.displayFormat, "')");
              } else {
                formattedInput = "".concat(format, "(").concat(formattedInput, ")");
              }
            }

            if (field.expr) {
              formattedInput = field.expr;
            }

            if (!(field.name || field.src)) {
              throw new Error("A name or src needs to specified on the field: ".concat(JSON.stringify(field)));
            }

            return "".concat(indentation() + formattedInput, " AS \"").concat(escapeText(field.name || field.src), "\"");
          }).join(',\n');
        }

        return '*';
      }
      /**
       * Is the table used as a proceeding load
       * @public
       * @returns {boolean}
       */

    }, {
      key: "isProceedingLoad",
      value: function isProceedingLoad() {
        return this.connection instanceof Table;
      }
      /**
       * Returns the specified prefix of the table if it exists.
       * The prefix can be for instance be a Qlik script snippet that always should be executed before the table is loaded.
       * @public
       * @returns {string}
       */

    }, {
      key: "getPrefix",
      value: function getPrefix() {
        if (this.prefix) {
          return "".concat(this.prefix, "\n");
        }

        return '';
      }
      /**
       * Get the script representation of the table
       * @public
       * @returns {string}
       */

    }, {
      key: "getScript",
      value: function getScript() {
        // In the future this could be moved into a connectionMatcher
        // but for sake of clarity it is kept inline.
        if (this.isProceedingLoad()) {
          return "".concat(this.getPrefix(), "LOAD\n").concat(this.getFieldList(), ";\n").concat(this.connection.getScript());
        } // Hack!


        if (this.connection.getFileExtension) {
          this.options.fileExtension = this.connection.getFileExtension();
        }

        return "".concat(this.getPrefix(), "LOAD\n").concat(this.getFieldList(), "\n").concat(this.connection.getScript()).concat(formatSpecification(this.options), ";");
      }
      /**
       * Get the name of the table
       * @public
       * @returns {string}
       */

    }, {
      key: "getName",
      value: function getName() {
        return this.name || '';
      }
      /**
       * Get the section that the table belongs to
       * @public
       * @returns {string}
       */

    }, {
      key: "getSection",
      value: function getSection() {
        return this.section;
      }
      /**
       * Returns the connection or table that the table uses.
       * @public
       * @returns {(Connection|Table)} Connection or Table
       */

    }, {
      key: "getConnection",
      value: function getConnection() {
        return this.connection;
      }
    }]);

    return Table;
  }();

  /**
   * @constant
   * @type {{timestamp: string, date: string, time: string, interval: string}}
   */
  var qTypes = {
    timestamp: 'TS',
    date: 'D',
    time: 'T',
    interval: 'IV'
  };
  /**
   * @constant
   * @type {{timestamp: string, text: string, numeric: string}}
   */

  var qDimensionType = {
    timestamp: 'T',
    text: 'D',
    numeric: 'N'
  };
  var hyperCubeSpecification = {
    qTypes: qTypes,
    qDimensionType: qDimensionType
  };

  var DEFAULT_DELIMITER = ',';
  /**
   * If a dimension has mixed types
   * @private
   * @param {QAE.NxDimension} dimension
   * @returns {boolean}
   */

  function isDimensionTypeMixed(dimension) {
    return dimension.qDimensionType === hyperCubeSpecification.qDimensionType.numeric && dimension.qTags.length === 0;
  }
  /**
   * Is dimension type a text
   * @private
   * @param {QAE.NxDimension} dimension
   * @returns {boolean}
   */


  function isDimensionTypeText(dimension) {
    return dimension.qDimensionType === hyperCubeSpecification.qDimensionType.text;
  }
  /**
   * Is dimension type a timestamp
   * @private
   * @param {QAE.NxDimension} dimension
   * @returns {boolean}
   */


  function isDimensionTypeTimestamp(dimension) {
    if (dimension.qDimensionType === hyperCubeSpecification.qDimensionType.timestamp) {
      return true;
    }

    if (dimension.qDimensionType === hyperCubeSpecification.qDimensionType.numeric && dimension.qNumFormat.qType === hyperCubeSpecification.qTypes.timestamp) {
      return true;
    }

    return false;
  }
  /**
   * Is dimension type a date
   * @private
   * @param {QAE.NxDimension} dimension
   * @returns {boolean}
   */


  function isDimensionTypeDate(dimension) {
    if (dimension.qDimensionType === hyperCubeSpecification.qDimensionType.numeric && dimension.qNumFormat.qType === hyperCubeSpecification.qTypes.date) {
      return true;
    }

    return false;
  }
  /**
   * Is dimension type a time
   * @private
   * @param {QAE.NxDimension} dimension
   * @returns {boolean}
   */


  function isDimensionTypeTime(dimension) {
    if (dimension.qDimensionType === hyperCubeSpecification.qDimensionType.numeric && dimension.qNumFormat.qType === hyperCubeSpecification.qTypes.time) {
      return true;
    }

    return false;
  }
  /**
   * Is dimension type an interval
   * @private
   * @param {QAE.NxDimension} dimension
   * @returns {boolean}
   */


  function isDimensionTypeInterval(dimension) {
    if (dimension.qDimensionType === hyperCubeSpecification.qDimensionType.numeric && dimension.qNumFormat.qType === hyperCubeSpecification.qTypes.interval) {
      return true;
    }

    return false;
  }
  /**
   * Get dimension type where the dimension matches one of the following text, mixed, timestamp, time, data, interval or num.
   * @private
   * @param {QAE.NxDimension} dimension
   * @returns {string}
   */


  function getDimensionType(dimension) {
    if (isDimensionTypeText(dimension)) {
      return 'text';
    }

    if (isDimensionTypeMixed(dimension)) {
      return 'mixed';
    }

    if (isDimensionTypeTimestamp(dimension)) {
      return 'timestamp';
    }

    if (isDimensionTypeTime(dimension)) {
      return 'time';
    }

    if (isDimensionTypeDate(dimension)) {
      return 'date';
    }

    if (isDimensionTypeInterval(dimension)) {
      return 'interval';
    }

    return 'num';
  }
  /**
   * Is numeric dimension type
   * @private
   * @param {string} dimensionType
   * @returns {boolean}
   */

  function isNumericDimensionType(dimensionType) {
    var numericDimensionTypes = ['timestamp', 'interval', 'time', 'date', 'num'];
    dimensionType = dimensionType || '';
    return numericDimensionTypes.indexOf(dimensionType.toLowerCase()) > -1;
  }
  /**
   * Is field numeric
   * @private
   * @param {QAE.NxField} field
   * @returns {boolean}
   */


  function storeNumeric(field) {
    if (field.type === 'measure') {
      return true;
    }

    if (field.type === 'dimension' && isNumericDimensionType(field.dimensionType)) {
      return true;
    }

    return false;
  }
  /**
   * Check if field is a dual value
   * @private
   * @param {Field} field
   * @returns {boolean}
   */


  function checkIfFieldIsDual(field) {
    return field.type === 'dimension' && field.dimensionType === 'num';
  }
  /**
   * Has cell a dual value
   * @private
   * @param {QAE.NxCell} cell
   * @param {Field} field
   * @returns {boolean}
   */

  function isCellDual(cell, field) {
    return checkIfFieldIsDual(field) && cell.qText !== Number(cell.qNum).toString();
  }
  /**
   * Escape string containing delimiter
   * @private
   * @param {string} string
   * @param {string} delimiter
   * @returns {string}
   */

  function escapeStringContainingDelimiter(string, delimiter) {
    if (string.indexOf(delimiter) > -1 || string.indexOf('\n') > -1) {
      return "'".concat(string.replace(/'/g, "''").replace(/\n/g, ' '), "'");
    }

    return string;
  }
  /**
   * Get the numeric from cell value
   * @private
   * @param {QAE.NxCell} cell
   * @returns {number}
   */


  function getNumericCellValue(cell) {
    return cell.qNum;
  }
  /**
   * Get the text from a cell value
   * @private
   * @param {QAE.NxCell} cell
   * @returns {string}
   */


  function getTextCellValue(cell) {
    return escapeStringContainingDelimiter(cell.qText, DEFAULT_DELIMITER);
  }
  /**
   * Get the value of a cell
   * @private
   * @param {QAE.NxCell} cell
   * @param {Field} field
   * @returns {(string|number)}
   */


  function getCellValue(cell, field) {
    if (storeNumeric(field)) {
      return getNumericCellValue(cell);
    }

    return getTextCellValue(cell);
  }
  /**
   * Get dual data row
   * @private
   * @param {QAE.NxCell} cell
   * @returns {string}
   */

  function getDualDataRow(cell) {
    return "".concat(cell.qNum).concat(DEFAULT_DELIMITER).concat(escapeStringContainingDelimiter(cell.qText, DEFAULT_DELIMITER));
  }
  /**
   * Get dual headers from a field
   * @private
   * @param {Field} field
   * @returns {string}
   */

  function getDualHeadersForField(field) {
    return "".concat(field.name).concat(DEFAULT_DELIMITER).concat(field.name, "_qText}");
  }

  var HyperCube =
  /*#__PURE__*/
  function () {
    /**
     * Hypercube representation
     * @public
     * @class
     * @param {object} hyperCubeLayout - The QIX representation of a hypercube
     * @param {object} options - Hypercube options
     * @param {string} name - Name
     * @param {string} section - Section to add hypercube data to
     * @constructor
     */
    function HyperCube(hyperCubeLayout, options) {
      _classCallCheck(this, HyperCube);

      this.items = [];
      this.fields = [];
      this.hyperCubeLayout = this.validateHyperCubeLayout(hyperCubeLayout);
      options = options || {};

      if (typeof options === 'string') {
        this.name = options;
        options = {};
      } else {
        this.name = options.name;

        if (options.section) {
          this.section = options.section;
        }
      }

      this.parseHyperCubeLayout(options);
      this.options = options;
    }
    /**
     * Validate the hypercube layout
     * @private
     * @param {object} hyperCubeLayout
     * @returns {object} hyperCubeLayout
     */


    _createClass(HyperCube, [{
      key: "validateHyperCubeLayout",
      value: function validateHyperCubeLayout(hyperCubeLayout) {
        if (!hyperCubeLayout) {
          throw new Error('Hyper cube layout is undefined');
        }

        if (!hyperCubeLayout.qDimensionInfo) {
          throw new Error('qDimensionInfo is undefined');
        }

        if (!hyperCubeLayout.qMeasureInfo) {
          throw new Error('qMeasureInfo is undefined');
        }

        if (hyperCubeLayout.qMode === 'P') {
          throw new Error('Cannot add hyper cube in pivot mode, qMode:P(DATA_MODE_PIVOT) is not supported');
        }

        if (hyperCubeLayout.qMode === 'K') {
          throw new Error('Cannot add hyper cube in stacked mode, qMode:K(DATA_MODE_PIVOT_STACK) is not supported');
        }

        if (hyperCubeLayout.qMode === 'S') {
          this.validateDataPages(hyperCubeLayout.qDataPages);
          this.validateDataPagesCoverage(hyperCubeLayout.qDataPages, hyperCubeLayout);
          return hyperCubeLayout;
        }

        throw new Error('HyperCubeLayout is not valid');
      }
      /**
       * Validates the datapages of the hypercube
       * @private
       * @param {object} dataPages
       */

    }, {
      key: "validateDataPages",
      value: function validateDataPages(dataPages) {
        if (!dataPages) {
          throw new Error('qDataPages are undefined');
        }

        if (dataPages[0].qArea && dataPages[0].qArea.qTop > 0) {
          throw new Error('qDataPages first page should start at qTop: 0.');
        }
      }
      /**
       * Validates that all datapages in the hypercube is covered
       * @private
       * @param {object[]} dataPages
       * @param {object} hyperCubeLayout
       */

    }, {
      key: "validateDataPagesCoverage",
      value: function validateDataPagesCoverage(dataPages, hyperCubeLayout) {
        var _this = this;

        var qHeight = 0;
        dataPages.forEach(function (dataPage) {
          _this.validateQMatrix(dataPage);

          _this.validateQArea(dataPage, hyperCubeLayout, qHeight);

          qHeight += dataPage.qArea.qHeight;
        }, this);

        if (hyperCubeLayout.qSize.qcy !== qHeight) {
          throw new Error('qDataPages are missing pages.');
        }
      }
      /**
       * Validates the QMatrix in the datapage
       * @private
       * @param {object} dataPage
       */

    }, {
      key: "validateQMatrix",
      value: function validateQMatrix(dataPage) {
        if (!dataPage.qMatrix) {
          throw new Error('qMatrix of qDataPages are undefined');
        }

        if (dataPage.qMatrix.length === 0) {
          throw new Error('qDataPages are empty');
        }
      }
      /**
       * Validates the QArea in the datapage
       * @private
       * @param {object} dataPage
       * @param {object} hyperCubeLayout
       * @param {number} qHeight
       */

    }, {
      key: "validateQArea",
      value: function validateQArea(dataPage, hyperCubeLayout, qHeight) {
        if (!dataPage.qArea) {
          throw new Error('qArea of qDataPages are undefined');
        }

        if (dataPage.qArea.qLeft > 0) {
          throw new Error('qDataPages have data pages that\'s not of full qWidth.');
        }

        if (dataPage.qArea.qWidth < hyperCubeLayout.qSize.qcx) {
          throw new Error('qDataPages have data pages that\'s not of full qWidth.');
        }

        if (dataPage.qArea.qTop < qHeight) {
          throw new Error('qDataPages have overlapping data pages.');
        }

        if (dataPage.qArea.qTop > qHeight) {
          throw new Error('qDataPages are missing pages.');
        }
      }
      /**
       * Parses the hypercube an extracts the data
       * @private
       */

    }, {
      key: "parseHyperCubeLayout",
      value: function parseHyperCubeLayout() {
        var that = this;
        that.fields = that.getFieldsFromHyperCubeLayout();
        that.data = that.getDataFromHyperCubeLayout();
        var inlineData = "".concat(that.fields.map(function (field) {
          return field.name;
        }).join(','), "\n").concat(this.data);
        var hasDual = false;
        that.fields.forEach(function (field) {
          if (field.isDual) {
            hasDual = true;
            that.items.push(that.getMapTableForDualField(field));
          }
        });
        var options = {
          name: that.name,
          fields: that.getFieldsDefinition(that.fields)
        };

        if (that.section && !hasDual) {
          options.section = that.section;
        }

        that.items.push(new Table(inlineData, options));
      }
      /**
       * Get the Fields definition
       * @private
       * @param {object[]} fields
       * @returns {object[]} fields
       */

    }, {
      key: "getFieldsDefinition",
      value: function getFieldsDefinition(fields) {
        return fields.map(function (field) {
          var mappedField = {
            name: field.name
          };

          if (validFieldType(field.dimensionType)) {
            mappedField.type = field.dimensionType;
            mappedField.displayFormat = field.displayFormat;
          }

          if (field.isDual) {
            mappedField.expr = "Dual(ApplyMap('MapDual__".concat(field.name, "', \"").concat(field.name, "\"), \"").concat(field.name, "\")");
          } else {
            mappedField.src = field.name;
          }

          return mappedField;
        });
      }
      /**
       * Return qmatrix with dual fields
       * @private
       * @param {object} qMatrix
       * @param {object} field
       * @returns {object} field
       */

    }, {
      key: "mapDualFieldQMatrix",
      value: function mapDualFieldQMatrix(qMatrix, field) {
        function uniqueFilter(value, index, self) {
          return self.indexOf(value) === index;
        }

        return qMatrix.map(function (row) {
          return getDualDataRow(row[field.index]);
        }).filter(uniqueFilter);
      }
      /**
       * Get table with dual fields
       * @private
       * @param {object} field
       * @returns {object} Table
       */

    }, {
      key: "getMapTableForDualField",
      value: function getMapTableForDualField(field) {
        var that = this;
        var concatQMatrix = that.hyperCubeLayout.qDataPages.reduce(function (prev, curr) {
          return [].concat(_toConsumableArray(prev), _toConsumableArray(curr.qMatrix));
        }, []);
        var data = that.mapDualFieldQMatrix(concatQMatrix, field);
        var headers = getDualHeadersForField(field);
        var inlineData = "".concat(headers, "\n").concat(data.join('\n'));
        var name = "MapDual__".concat(field.name);
        var options = {
          name: name,
          prefix: 'Mapping'
        };

        if (this.section && this.items.length === 0) {
          options.section = this.section;
        }

        return new Table(inlineData, options);
      }
      /**
       * Extracts the data from the hypercube layout as a csv representation
       * @private
       * @returns {string}
       */

    }, {
      key: "getDataFromHyperCubeLayout",
      value: function getDataFromHyperCubeLayout() {
        var that = this;
        var data = that.hyperCubeLayout.qDataPages.map(function (dataPage) {
          return dataPage.qMatrix.map(function (row) {
            return row.map(function (cell, index) {
              var field = that.fields[index];

              if (!field.isDual && isCellDual(cell, field)) {
                field.isDual = true;
              }

              return getCellValue(cell, field);
            }).join(',');
          }).join('\n');
        }).join('\n');
        return data;
      }
      /**
       * Get the fields from the hypercube
       * @private
       * @returns {Array<{type: string, dimensionType: string, name: string, displayFormat: string, index: number}>} - An array of dimension and measures
       */

    }, {
      key: "getFieldsFromHyperCubeLayout",
      value: function getFieldsFromHyperCubeLayout() {
        var that = this;
        var fields = [];

        for (var i = 0; i < that.hyperCubeLayout.qDimensionInfo.length; i += 1) {
          fields.push({
            type: 'dimension',
            dimensionType: getDimensionType(that.hyperCubeLayout.qDimensionInfo[i]),
            name: that.hyperCubeLayout.qDimensionInfo[i].qFallbackTitle,
            displayFormat: that.hyperCubeLayout.qDimensionInfo[i].qNumFormat.qFmt,
            index: i
          });
        }

        for (var j = 0; j < that.hyperCubeLayout.qMeasureInfo.length; j += 1) {
          fields.push({
            type: 'measure',
            name: that.hyperCubeLayout.qMeasureInfo[j].qFallbackTitle,
            index: that.hyperCubeLayout.qDimensionInfo.length + j
          });
        }

        return fields;
      }
      /**
       * Get tables from the hypercube
       * @public
       * @returns {object[]} Tables
       */

    }, {
      key: "getItems",
      value: function getItems() {
        return this.items;
      }
    }]);

    return HyperCube;
  }();

  var SetStatement =
  /*#__PURE__*/
  function () {
    /**
     * Define set statements
     * @class
     * @public
     * @param {object} defaultSetStatements - A representation where each property name will be used as key and the property will be the value
     * @constructor
     */
    function SetStatement(defaultSetStatements) {
      _classCallCheck(this, SetStatement);

      this.defaultSetStatements = defaultSetStatements;
    }
    /**
     * Get the entire set statement as script
     * @public
     * @returns {string}
     */


    _createClass(SetStatement, [{
      key: "getScript",
      value: function getScript() {
        var _this = this;

        return Object.keys(this.defaultSetStatements).map(function (key) {
          return "SET ".concat(key, "='").concat(Array.isArray(_this.defaultSetStatements[key]) ? _this.defaultSetStatements[key].join(';') : _this.defaultSetStatements[key], "';");
        }).join('\n');
      }
      /**
       * Always returns the name as empty
       * @public
       * @returns {string}
       */

    }, {
      key: "getName",
      value: function getName() {
        return '';
      }
    }]);

    return SetStatement;
  }();

  var DerivedFieldsTemplate =
  /*#__PURE__*/
  function () {
    /**
     * Declare fields that can be derived from a template. An example can be a calendar template.
     * @public
     * @param {object} options - Derived Field Template definition.
     * @param {callback} options.fieldMatchFunction - Matching function that will apply a field template definition.
     * @param {string} options.name - Name of derived field.
     * @param {string} options.fieldTag - What field tag that will be used in the derived field.
     * @param {string} options.derivedFieldDefinition - What script definition should be used in the derived field.
     * @constructor
     */
    function DerivedFieldsTemplate(options) {
      _classCallCheck(this, DerivedFieldsTemplate);

      this.getFieldFn = options.fieldMatchFunction;
      this.name = options.name;
      this.fieldTag = options.fieldTag;
      this.derivedFieldDefinition = options.derivedFieldDefinition;
    }
    /**
     * Returns the script
     * @public
     * @returns {string}
     */


    _createClass(DerivedFieldsTemplate, [{
      key: "getScript",
      value: function getScript() {
        var fields = this.getFieldFn() || [];

        if (fields.length > 0) {
          return this.getDefinition(fields.map(getFieldName));
        }

        return undefined;
      }
      /**
       * Get the script definition for a set of specific fields
       * @public
       * @param {string[]} fieldNames - An array of strings with field names.
       * @returns {string}
       */

    }, {
      key: "getDefinition",
      value: function getDefinition(fieldNames) {
        return "\"".concat(escapeText(this.name), "\":\nDECLARE FIELD DEFINITION Tagged ('$").concat(this.fieldTag, "')\nFIELDS\n").concat(this.derivedFieldDefinition, "\nDERIVE FIELDS FROM FIELDS [").concat(fieldNames.join(', '), "] USING \"").concat(escapeText(this.name), "\";");
      }
    }]);

    return DerivedFieldsTemplate;
  }();

  var derivedFieldsDefinition = "Dual(Year($1), YearStart($1)) AS [Year] Tagged ('$axis', '$year'),\n  Dual('Q'&Num(Ceil(Num(Month($1))/3)),Num(Ceil(NUM(Month($1))/3),00)) AS [Quarter] Tagged ('$quarter', '$cyclic'),\n  Dual(Year($1)&'-Q'&Num(Ceil(Num(Month($1))/3)),QuarterStart($1)) AS [YearQuarter] Tagged ('$yearquarter', '$qualified'),\n  Dual('Q'&Num(Ceil(Num(Month($1))/3)),QuarterStart($1)) AS [_YearQuarter] Tagged ('$yearquarter', '$hidden', '$simplified'),\n  Month($1) AS [Month] Tagged ('$month', '$cyclic'),\n  Dual(Year($1)&'-'&Month($1), monthstart($1)) AS [YearMonth] Tagged ('$axis', '$yearmonth', '$qualified'),\n  Dual(Month($1), monthstart($1)) AS [_YearMonth] Tagged ('$axis', '$yearmonth', '$simplified', '$hidden'),\n  Dual('W'&Num(Week($1),00), Num(Week($1),00)) AS [Week] Tagged ('$weeknumber', '$cyclic'),\n  Date(Floor($1)) AS [Date] Tagged ('$axis', '$date', '$qualified'),\n  Date(Floor($1), 'D') AS [_Date] Tagged ('$axis', '$date', '$hidden', '$simplified'),\n  If (DayNumberOfYear($1) <= DayNumberOfYear(Today()), 1, 0) AS [InYTD] ,\nYear(Today())-Year($1) AS [YearsAgo] ,\n  If (DayNumberOfQuarter($1) <= DayNumberOfQuarter(Today()),1,0) AS [InQTD] ,\n4*Year(Today())+Ceil(Month(Today())/3)-4*Year($1)-Ceil(Month($1)/3) AS [QuartersAgo] ,\nCeil(Month(Today())/3)-Ceil(Month($1)/3) AS [QuarterRelNo] ,\n  If(Day($1)<=Day(Today()),1,0) AS [InMTD] ,\n12*Year(Today())+Month(Today())-12*Year($1)-Month($1) AS [MonthsAgo] ,\nMonth(Today())-Month($1) AS [MonthRelNo] ,\n  If(WeekDay($1)<=WeekDay(Today()),1,0) AS [InWTD] ,\n(WeekStart(Today())-WeekStart($1))/7 AS [WeeksAgo] ,\nWeek(Today())-Week($1) AS [WeekRelNo];";
  /**
   * A field matching callback to identify which fields that are associated with a specific calendarTemplate.
   * @callback fieldMatchingCalendarCallback
   * @param {string} calendarTemplate
   * @param {Field} field
   */

  /**
   * Get the derived field definition for a field that matches the pattern
   * @public
   * @param {fieldMatchingCalendarCallback} fn - Field matcher function
   * @returns {DerivedFieldsTemplate}
   */

  function getCalenderDerivedFieldDefinition(fn) {
    return new DerivedFieldsTemplate({
      name: 'autoCalendar',
      fieldTag: 'date',
      derivedFieldDefinition: derivedFieldsDefinition,
      fieldMatchFunction: function fieldMatchFunction() {
        return fn(function (f) {
          return f.calendarTemplate;
        });
      }
    });
  }

  var SCRIPT_BLOCK_SPACING = '\n\n';

  var Halyard =
  /*#__PURE__*/
  function () {
    /**
     * Representation of tables or hypercubes to load
     * @class
     * @public
     * @constructor
     */
    function Halyard() {
      var _this = this;

      _classCallCheck(this, Halyard);

      this.defaultSetStatements = {};
      this.items = [];
      this.addItem(new SetStatement(this.defaultSetStatements));
      this.lastItems = [getCalenderDerivedFieldDefinition(function (x) {
        return _this.getFields(x);
      })];
    }
    /**
     * Get connections object that are used in the model
     * @public
     * @returns {Connection[]}
     */


    _createClass(Halyard, [{
      key: "getConnections",
      value: function getConnections() {
        return this.items.filter(function (item) {
          return item.getConnection;
        }).map(function (item) {
          return item.getConnection();
        });
      }
      /**
       * Get the QIX connections definitions that are used in the model
       * @public
       * @returns {{qName: (string), qConnectionString: (string), qType: (string)}
       */

    }, {
      key: "getQixConnections",
      value: function getQixConnections() {
        return this.getConnections().map(function (connection) {
          return connection.getQixConnectionObject();
        }).filter(function (connection) {
          return connection;
        });
      }
      /**
       * Field matching callback to identify if a field matches another
       * @callback fieldMatchingCallback
       * @param {Field} field
       * @returns {boolean}
       */

      /**
       * Get fields that matches pattern sent in as params
       * @public
       * @param {fieldMatchingCallback} matcherFn
       * @returns {Field[]}
       */

    }, {
      key: "getFields",
      value: function getFields(matcherFn) {
        matcherFn = matcherFn || function () {
          return true;
        };

        var fields = [];
        this.items.forEach(function (item) {
          if (item.getFields && item.getFields()) {
            fields.push.apply(fields, _toConsumableArray(item.getFields().filter(matcherFn)));
          }
        });
        return fields;
      }
      /**
       * Configure the default set statements like time, date, currency formats
       * @public
       * @param {SetStatement} defaultSetStatements
       * @param {boolean} preservePreviouslyEnteredValues
       */

    }, {
      key: "setDefaultSetStatements",
      value: function setDefaultSetStatements(defaultSetStatements, preservePreviouslyEnteredValues) {
        var that = this;
        Object.keys(defaultSetStatements).forEach(function (key) {
          if (!(preservePreviouslyEnteredValues && that.defaultSetStatements[key])) {
            that.defaultSetStatements[key] = defaultSetStatements[key];
          }
        });
      }
      /**
       * Get the script for a item (table, preceeding load)
       * @public
       * @param {(Table|HyperCube)} item
       * @returns {string}
       */

    }, {
      key: "getItemScript",
      value: function getItemScript(item) {
        var itemScript = item.getScript();

        if (item.getName && item.getName()) {
          if (item.section) {
            itemScript = "///$tab ".concat(escapeText(item.section), "\n\"").concat(escapeText(item.getName()), "\":\n").concat(itemScript);
          } else {
            itemScript = "\"".concat(escapeText(item.getName()), "\":\n").concat(itemScript);
          }
        }

        return itemScript;
      }
      /**
       * Fetch all script blocks
       * @public
       * @returns {string[]}
       */

    }, {
      key: "getAllScriptBlocks",
      value: function getAllScriptBlocks() {
        return this.items.concat(this.lastItems).filter(function (item) {
          return item.getScript();
        });
      }
      /**
       * Fetches the entire script
       * @public
       * @returns {string}
       */

    }, {
      key: "getScript",
      value: function getScript() {
        var _this2 = this;

        return this.getAllScriptBlocks().map(function (item) {
          return _this2.getItemScript(item);
        }).join(SCRIPT_BLOCK_SPACING);
      }
      /**
       * Add hyper cube explicit or implicitly
       * @public
       * @param {HyperCube} arg1 - Hypercube
       * @param {object} options - Hypercube options
       * @param {string} options.name - Name
       * @param {string} options.section - Section to add hypercube data to
       * @returns {object} Hypercube
       */

    }, {
      key: "addHyperCube",
      value: function addHyperCube(arg1, options) {
        var newHyperCube;

        if (arg1 instanceof HyperCube) {
          newHyperCube = arg1;
        } else {
          newHyperCube = new HyperCube(arg1, options);
        }

        for (var i = 0; i < newHyperCube.items.length; i += 1) {
          this.checkIfItemNameExists(newHyperCube.items[i]);
        }

        for (var _i = 0; _i < newHyperCube.items.length; _i += 1) {
          this.addItem(newHyperCube.items[_i]);
        }

        return newHyperCube;
      }
      /**
       * Support to add table explicit or implicitly
       * @public
       * @param {Table} arg1 - Table
       * @param {object} options
       * @param {string} options.name - Table name
       * @param {Field[]} options.fields - Array of field objects
       * @param {string} options.prefix - Add prefix before the table
       * @param {string} options.section - Section to add table to
       * @returns {object} Table
       */

    }, {
      key: "addTable",
      value: function addTable(arg1, options) {
        var newTable;

        if (arg1 instanceof Table) {
          newTable = arg1;
        } else {
          newTable = new Table(arg1, options);
        }

        return this.addItem(newTable);
      }
      /**
       * Verify that item doesn't exist in model
       * @public
       * @param {(Table|HyperCube)} newItem - Table or Hypercube
       */

    }, {
      key: "checkIfItemNameExists",
      value: function checkIfItemNameExists(newItem) {
        if (newItem.getName && newItem.getName()) {
          if (this.items.filter(function (item) {
            return item.getName() === newItem.getName();
          }).length > 0) {
            throw new Error('Cannot add another table with the same name.');
          }
        }
      }
      /**
       * Add new item to the model
       * @public
       * @param {(Table|HyperCube)} newItem - Table or Hypercube
       * @returns {(Table|HyperCube)} - Table or Hypercube
       */

    }, {
      key: "addItem",
      value: function addItem(newItem) {
        this.checkIfItemNameExists(newItem);
        this.items.push(newItem);
        return newItem;
      }
      /**
       * Locate which item that generated a script at the specified character position
       * @public
       * @param {number} charPosition
       * @returns {(Table|HyperCube)} - Table or Hypercube
       */

    }, {
      key: "getItemThatGeneratedScriptAt",
      value: function getItemThatGeneratedScriptAt(charPosition) {
        var allScriptBlocks = this.getAllScriptBlocks();
        var scriptBlockStartPosition = 0;

        for (var i = 0; i < allScriptBlocks.length; i += 1) {
          var itemScript = this.getItemScript(allScriptBlocks[i]);
          var scriptBlockEndPosition = scriptBlockStartPosition + "".concat(itemScript).concat(SCRIPT_BLOCK_SPACING).length;

          if (scriptBlockStartPosition <= charPosition && charPosition <= scriptBlockEndPosition) {
            return allScriptBlocks[i];
          }

          scriptBlockStartPosition = scriptBlockEndPosition;
        }

        return undefined;
      }
    }]);

    return Halyard;
  }();

  Halyard.Table = Table;
  Halyard.HyperCube = HyperCube;
  Halyard.Connections = Connections;

  if (typeof module !== 'undefined') {
    module.exports = Halyard;
  }

  return Halyard;

}));
//# sourceMappingURL=halyard.js.map
