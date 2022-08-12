import type { App } from 'vue';

import AccordionInstall, { Accordion } from './accordion';
import AlertInstall, { Alert } from './alert';
import AnchorInstall, { Anchor } from './anchor';
import AutoCompleteInstall, { AutoComplete } from './auto-complete';
import AvatarInstall, { Avatar } from './avatar';
import BackTopInstall, { BackTop } from './back-top';
import BadgeInstall, { Badge } from './badge';
import BreadcrumbInstall, { Breadcrumb } from './breadcrumb';
import ButtonInstall, { Button, ButtonGroup } from './button';
import CardInstall, { Card } from './card';
import CarouselInstall, { Carousel, CarouselItem } from './carousel';
import CascaderInstall, { Cascader } from './cascader';
import CheckboxInstall, { Checkbox, CheckboxGroup, CheckboxButton } from './checkbox';
import CollapseInstall, { Collapse, CollapseItem } from './collapse';
import ColorPickerInstall, { ColorPicker } from './color-picker';
import CommentInstall, { Comment } from './comment';
import CountdownInstall, { Countdown } from './countdown';
import DatePickerInstall, { DatePicker, StickSlider } from './date-picker';
import DatePickerProInstall, { DatePickerPro, DRangeDatePickerPro } from './date-picker-pro';
import DragdropInstall, { DraggableDirective, DroppableDirective, SortableDirective } from './dragdrop';
import DrawerInstall, { Drawer, DrawerService } from './drawer';
import DropdownInstall, { Dropdown, DropdownMenu } from './dropdown';
import EditableSelectInstall, { EditableSelect } from './editable-select';
import FormInstall, { Form, FormItem, FormOperation } from './form';
import FullscreenInstall, { Fullscreen } from './fullscreen';
import GanttInstall, { Gantt } from './gantt';
import GridInstall, { Row, Col } from './grid';
import IconInstall, { Icon, IconGroup } from './icon';
import ImagePreviewInstall, { ImagePreviewDirective, ImagePreviewService } from './image-preview';
import InputInstall, { Input } from './input';
import InputIconInstall, { InputIcon } from './input-icon';
import InputNumberInstall, { InputNumber } from './input-number';
import LayoutInstall, { Layout, Content, Header, Footer, Aside } from './layout';
import ListInstall, { List, ListItem } from './list';
import LoadingInstall, { LoadingService, LoadingDirective } from './loading';
import MentionInstall, { Mention } from './mention';
import MenuInstall, { Menu, SubMenu, MenuItem } from './menu';
import MessageInstall, { Message } from './message';
import ModalInstall, { Modal } from './modal';
import MultiAutoCompleteInstall, { MultiAutoComplete } from './multi-auto-complete';
import NavSpriteInstall, { NavSprite } from './nav-sprite';
import NotificationInstall, { Notification, NotificationService } from './notification';
import OverlayInstall, { FlexibleOverlay, FixedOverlay } from './overlay';
import PaginationInstall, { Pagination } from './pagination';
import PanelInstall, { Panel, PanelHeader, PanelBody, PanelFooter } from './panel';
import PopoverInstall, { Popover } from './popover';
import ProgressInstall, { Progress } from './progress';
import QuadrantDiagramInstall, { QuadrantDiagram } from './quadrant-diagram';
import RadioInstall, { Radio, RadioGroup, RadioButton } from './radio';
import RateInstall, { Rate } from './rate';
import ReadTipInstall, { ReadTip } from './read-tip';
import ResultInstall, { Result } from './result';
import RippleInstall, { RippleDirective } from './ripple';
import SearchInstall, { Search } from './search';
import SelectInstall, { Select, Option, OptionGroup } from './select';
import SkeletonInstall, { Skeleton, SkeletonItem } from './skeleton';
import SliderInstall, { Slider } from './slider';
import SplitterInstall, { Splitter } from './splitter';
import StatisticInstall, { Statistic } from './statistic';
import StatusInstall, { Status } from './status';
import StepsInstall, { Steps, Step } from './steps';
import StepsGuideInstall, { StepsGuide, StepsGuideDirective } from './steps-guide';
import StickyInstall, { Sticky } from './sticky';
import SwitchInstall, { Switch } from './switch';
import TableInstall, { Table, Column } from './table';
import TabsInstall, { Tabs, Tab } from './tabs';
import TagInstall, { Tag } from './tag';
import TagInputInstall, { TagInput } from './tag-input';
import TextareaInstall, { Textarea } from './textarea';
import TimePickerInstall, { TimePicker } from './time-picker';
import TimeSelectInstall, { TimeSelect } from './time-select';
import TimelineInstall, { Timeline, TimelineItem } from './timeline';
import TooltipInstall, { Tooltip } from './tooltip';
import TransferInstall, { Transfer } from './transfer';
import TreeInstall, { Tree } from './tree';
import TreeSelectInstall, { TreeSelect } from './tree-select';
import UploadInstall, { Upload } from './upload';
import VirtualListInstall, { VirtualList } from './virtual-list';
import './style/devui.scss';

const installs = [
  AccordionInstall,
  AlertInstall,
  AnchorInstall,
  AutoCompleteInstall,
  AvatarInstall,
  BackTopInstall,
  BadgeInstall,
  BreadcrumbInstall,
  ButtonInstall,
  CardInstall,
  CarouselInstall,
  CascaderInstall,
  CheckboxInstall,
  CollapseInstall,
  ColorPickerInstall,
  CommentInstall,
  CountdownInstall,
  DatePickerInstall,
  DatePickerProInstall,
  DragdropInstall,
  DrawerInstall,
  DropdownInstall,
  EditableSelectInstall,
  FormInstall,
  FullscreenInstall,
  GanttInstall,
  GridInstall,
  IconInstall,
  ImagePreviewInstall,
  InputInstall,
  InputIconInstall,
  InputNumberInstall,
  LayoutInstall,
  ListInstall,
  LoadingInstall,
  MentionInstall,
  MenuInstall,
  MessageInstall,
  ModalInstall,
  MultiAutoCompleteInstall,
  NavSpriteInstall,
  NotificationInstall,
  OverlayInstall,
  PaginationInstall,
  PanelInstall,
  PopoverInstall,
  ProgressInstall,
  QuadrantDiagramInstall,
  RadioInstall,
  RateInstall,
  ReadTipInstall,
  ResultInstall,
  RippleInstall,
  SearchInstall,
  SelectInstall,
  SkeletonInstall,
  SliderInstall,
  SplitterInstall,
  StatisticInstall,
  StatusInstall,
  StepsInstall,
  StepsGuideInstall,
  StickyInstall,
  SwitchInstall,
  TableInstall,
  TabsInstall,
  TagInstall,
  TagInputInstall,
  TextareaInstall,
  TimePickerInstall,
  TimeSelectInstall,
  TimelineInstall,
  TooltipInstall,
  TransferInstall,
  TreeInstall,
  TreeSelectInstall,
  UploadInstall,
  VirtualListInstall
];

export {
  Accordion,
  Alert,
  Anchor,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  Checkbox,
  CheckboxGroup,
  CheckboxButton,
  Collapse,
  CollapseItem,
  ColorPicker,
  Comment,
  Countdown,
  DatePicker,
  StickSlider,
  DatePickerPro,
  DRangeDatePickerPro,
  DraggableDirective,
  DroppableDirective,
  SortableDirective,
  Drawer,
  DrawerService,
  Dropdown,
  DropdownMenu,
  EditableSelect,
  Form,
  FormItem,
  FormOperation,
  Fullscreen,
  Gantt,
  Row,
  Col,
  Icon,
  IconGroup,
  ImagePreviewDirective,
  ImagePreviewService,
  Input,
  InputIcon,
  InputNumber,
  Layout,
  Content,
  Header,
  Footer,
  Aside,
  List,
  ListItem,
  LoadingService,
  LoadingDirective,
  Mention,
  Menu,
  SubMenu,
  MenuItem,
  Message,
  Modal,
  MultiAutoComplete,
  NavSprite,
  Notification,
  NotificationService,
  FlexibleOverlay,
  FixedOverlay,
  Pagination,
  Panel,
  PanelHeader,
  PanelBody,
  PanelFooter,
  Popover,
  Progress,
  QuadrantDiagram,
  Radio,
  RadioGroup,
  RadioButton,
  Rate,
  ReadTip,
  Result,
  RippleDirective,
  Search,
  Select,
  Option,
  OptionGroup,
  Skeleton,
  SkeletonItem,
  Slider,
  Splitter,
  Statistic,
  Status,
  Steps,
  Step,
  StepsGuide,
  StepsGuideDirective,
  Sticky,
  Switch,
  Table,
  Column,
  Tabs,
  Tab,
  Tag,
  TagInput,
  Textarea,
  TimePicker,
  TimeSelect,
  Timeline,
  TimelineItem,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Upload,
  VirtualList
};

export default {
  version: '1.0.0-rc.0',
  install(app: App): void {
    installs.forEach((p) => app.use(p));
  }
};
