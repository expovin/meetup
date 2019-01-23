const SongByDate = {
    qInfo: {
      qType: 'SongByDate',
    },
    qHyperCubeDef: {
      qDimensions: [
        {
          qDef: { qFieldDefs: ['released'] },
        },
      ],
      qMeasures: [
        {
          qDef: { qDef: '=Count(id)' },
        },
      ],
      qInitialDataFetch: [
        {
          qHeight: 15,
          qWidth: 20,
        },
      ],
    },
  };

  module.exports = SongByDate;