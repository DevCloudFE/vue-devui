const DARK_LINE_COLOR = '#4E5057';
const DARK_TITLE_COLOR = '#CED1DB';
const DARK_TEXT_COLOR = '#696C75';
const DARK_LEGEND_COLOR = '#868A99';
const DARK_AXIS_COLOR = '#4E5057';

const LIGHT_LINE_COLOR = '#D7D8DA';
const LIGHT_TITLE_COLOR = '#252B3A';
const LIGHT_TEXT_COLOR = '#9B9FA8';
const LIGHT_LEGEND_COLOR = '#71757F';
const LIGHT_AXIS_COLOR = '#D7D8DA';

export const DEFAULT_BASIC_COLOR_PALETTE = [
  '#5C8DFF',
  '#BC94FF',
  '#54D2EB',
  '#A6DD82',
  '#FCDA6B',
  '#CA7ED6',
  '#7298F1',
  '#73CEA6',
  '#EDD249',
  '#CAABFF',
  '#85CAFF',
  '#93D99A',
  '#96ADFA',
  '#F4AF8F',
  '#A282E9',
  '#FFBB6B',
  '#69DBB9',
  '#76DBEF',
  '#B1CE4F',
  '#5DA4DC'
];

function axisCommon(type: 'dark' | 'light') {
  if (type === 'dark') {
    return {
      axisLine: {
        lineStyle: {
          color: DARK_AXIS_COLOR,
        }
      },
      axisTick: {
        lineStyle: {
          color: DARK_AXIS_COLOR,
        }
      },
      axisLabel: {
        textStyle: {
          color: DARK_TEXT_COLOR,
        }
      },
      splitLine: {
        lineStyle: {
          type: [3, 3],
          color: DARK_LINE_COLOR
        },
      }
    };
  } else {
    return {
      axisLine: {
        lineStyle: {
          color: LIGHT_AXIS_COLOR,
        }
      },
      axisTick: {
        lineStyle: {
          color: LIGHT_AXIS_COLOR,
        }
      },
      axisLabel: {
        textStyle: {
          color: LIGHT_TEXT_COLOR,
        }
      },
      splitLine: {
        lineStyle: {
          type: [3, 3],
          color: LIGHT_LINE_COLOR
        },
      }
    };
  }
}


export const DEVUI_ECHART_THEME = {
  defaultColorPalette: DEFAULT_BASIC_COLOR_PALETTE,
  defaultDarkTheme: {
    color: DEFAULT_BASIC_COLOR_PALETTE,
    tooltip: {
      axisPointer: {
        label: {
          show: false
        },
        lineStyle: {
          color: DARK_LINE_COLOR,
          width: 2,
          type: [2, 3]
        },
        crossStyle: {
          color: DARK_LINE_COLOR,
          width: 2,
          type: [2, 3]
        }
      },
      backgroundColor: 'rgba(36,37,38,0.96)',
      extraCssText: 'border-radius: 8px;box-shadow: 0 1px 4px 0 rgba(37,43,58,0.1)',
      borderWidth: 0,
      padding: [8, 8],
      textStyle: {
        color: DARK_LEGEND_COLOR,
        fontSize: 12
      }
    },
    virtualMap: {
      textStyle: {
        color: DARK_TEXT_COLOR,
      }
    },
    legend: {
      height: '80%',
      width: '80%',
      textStyle: {
        color: DARK_LEGEND_COLOR,
      }
    },
    textStyle: {
      color: DARK_TEXT_COLOR
    },
    title: {
      textStyle: {
        color: DARK_TITLE_COLOR
      },
    },
    toolbox: {
      iconStyle: {
        borderColor: DARK_LINE_COLOR
      }
    },
    dataZoom: {
      textStyle: {
        color: DARK_TEXT_COLOR
      }
    },
    timeline: {
      lineStyle: {
        color: DARK_LINE_COLOR
      },
      label: {
        textStyle: {
          color: DARK_TEXT_COLOR
        }
      }
    },
    timeAxis: axisCommon('dark'),
    logAxis: axisCommon('dark'),
    valueAxis: {
      ...axisCommon('dark'),
      axisLine: {
        show: false,
        lineStyle: {
          color: DARK_AXIS_COLOR
        }
      },
      axisTick: {
        show: false
      }
    },
    categoryAxis: {
      ...axisCommon('dark'),
      axisLine: {
        show: true,
        lineStyle: {
          color: DARK_AXIS_COLOR
        }
      },
      axisTick: {
        show: false
      }
    },
    line: {
      symbol: 'circle',
    },
    graph: {
      color: DEFAULT_BASIC_COLOR_PALETTE
    },
    geo: {
      itemStyle: {
        borderColor: '#fff',
        areaColor: '#37383A'
      },
    },
  },

  defaultLightTheme: {
    color: DEFAULT_BASIC_COLOR_PALETTE,
    tooltip: {
      axisPointer: {
        label: {
          show: false
        },
        lineStyle: {
          color: LIGHT_LINE_COLOR,
          width: 2,
          type: [2, 3]
        },
        crossStyle: {
          color: LIGHT_LINE_COLOR,
          width: 2,
          type: [2, 3]
        }
      },
      backgroundColor: 'rgba(255,255,255,0.96)',
      extraCssText: 'border-radius: 8px;box-shadow: 0 1px 4px 0 rgba(37,43,58,0.1)',
      borderWidth: 0,
      padding: [8, 8],
      textStyle: {
        color: LIGHT_LEGEND_COLOR,
        fontSize: 12
      }
    },
    virtualMap: {
      textStyle: {
        color: LIGHT_TEXT_COLOR,
      }
    },
    legend: {
      height: '80%',
      width: '80%',
      align: 'left',
      textStyle: {
        color: LIGHT_LEGEND_COLOR,
      }
    },
    textStyle: {
      color: LIGHT_TEXT_COLOR
    },
    title: {
      textStyle: {
        color: LIGHT_TITLE_COLOR
      },
    },
    toolbox: {
      iconStyle: {
        borderColor: LIGHT_LINE_COLOR
      }
    },
    dataZoom: {
      textStyle: {
        color: LIGHT_TEXT_COLOR
      }
    },
    timeline: {
      lineStyle: {
        color: LIGHT_LINE_COLOR
      },
      label: {
        textStyle: {
          color: LIGHT_TEXT_COLOR
        }
      }
    },
    timeAxis: axisCommon('light'),
    logAxis: axisCommon('light'),
    valueAxis: {
      ...axisCommon('light'),
      axisLine: {
        show: false,
        lineStyle: {
          color: LIGHT_AXIS_COLOR
        }
      },
      axisTick: {
        show: false
      }
    },
    categoryAxis: {
      ...axisCommon('light'),
      axisLine: {
        show: true,
        lineStyle: {
          color: LIGHT_AXIS_COLOR
        }
      },
      axisTick: {
        show: false
      }
    },
    line: {
      symbol: 'emptyCircle',
      markPoint: {
        label: {
          show: true,
          color: LIGHT_TEXT_COLOR
        }
      }
    },
    graph: {
      color: DEFAULT_BASIC_COLOR_PALETTE
    },
    geo: {
      itemStyle: {
        borderColor: '#fff',
        areaColor: '#eaebed'
      },
    },
  }
};
