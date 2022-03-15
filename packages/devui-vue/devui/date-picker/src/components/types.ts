export type TDateCell = { date: Date; current: -1 | 0 | 1 };
export type TDatePanelMode = 'month' | 'year';
export type TDatePanelType = 'select' | 'range';
export type TEventCallback = (date: Date, position?: number) => void;

export type TDateConfig = {
  type?: TDatePanelType;
  mode?: TDatePanelMode;
  current: Date;
  showTime: boolean;
  dateMin?: Date;
  dateMax?: Date;
};

export type TDateSelectingBase = {
  dateStart?: Date;
  dateEnd?: Date;
  dateHover?: Date;
};

export type TDateToolbarEventProps = {
  onPreviousYear?: TEventCallback;
  onPreviousMonth?: TEventCallback;
  onNextMonth?: TEventCallback;
  onNextYear?: TEventCallback;
};

export type TDateToolbarDataProps = TDateConfig & {
  pos?: number;
  compare?: Date;
};

export type TDateToolbarProps = TDateToolbarDataProps & TDateToolbarEventProps;

export type TDatePanelEventProps = TDateToolbarEventProps & {
  onSelected?: TEventCallback;
  onReset?: TEventCallback;
  onSelectStart?: TEventCallback;
  onSelectEnd?: TEventCallback;
  onSelecting?: TEventCallback;
  onToday?: TEventCallback;
  onChange?: (type: TDatePanelType, config: TDateSelectingBase) => void;
};

export type TDatePanelDataProps = TDateToolbarDataProps & TDateSelectingBase;

export type TDatePanelProps = { showToday?: boolean } & TDatePanelDataProps & TDatePanelEventProps;


export type TProps = ({
  type: 'select';
} | {
  type: 'range';
  next: Date;
}) & TDateConfig & TDateSelectingBase & TDatePanelEventProps;

export type TIconSvgProps = {
  color?: string;
  rotate?: number;
};
export type TIconSvg = (props: TIconSvgProps) => any;

export type TCalendarToolbarItemProps = {
  disabled?: boolean;
  rotate?: number;
  cb?: (...args: any[]) => void;
  pos: number;
  date: Date;
  button: TIconSvg;
};
