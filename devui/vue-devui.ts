import type { App } from 'vue'

import AccordionInstall, { Accordion } from './accordion'
import AlertInstall, { Alert } from './alert'
import AnchorInstall, { Anchor } from './anchor'
import AvatarInstall, { Avatar } from './avatar'
import BadgeInstall, { Badge } from './badge'
import BreadcrumbInstall, { Breadcrumb } from './breadcrumb'
import ButtonInstall, { Button } from './button'
import CardInstall, { Card } from './card'
import CarouselInstall, { Carousel } from './carousel'
import CascaderInstall, { Cascader } from './cascader'
import CheckboxInstall, { Checkbox } from './checkbox'
import DatePickerInstall, { DatePicker, StickSlider } from './date-picker'
import DrawerInstall, { Drawer } from './drawer'
import EditableSelectInstall, { EditableSelect, EditableSelectOption } from './editable-select'
import FullscreenInstall, { Fullscreen } from './fullscreen'
import IconInstall, { Icon } from './icon'
import ImagePreviewInstall, { ImagePreviewDirective, ImagePreviewService } from './image-preview'
import InputInstall, { Input } from './input'
import InputNumberInstall, { InputNumber } from './input-number'
import LayoutInstall, { Layout, Content, Header, Footer, Aside } from './layout'
import LoadingInstall, { LoadingService, Loading } from './loading'
import ModalInstall, { Modal } from './modal'
import OverlayInstall, { FlexibleOverlay, FixedOverlay } from './overlay'
import PaginationInstall, { Pagination } from './pagination'
import PanelInstall, { Panel } from './panel'
import PopoverInstall, { Popover } from './popover'
import ProgressInstall, { Progress } from './progress'
import QuadrantDiagramInstall, { QuadrantDiagram } from './quadrant-diagram'
import RadioInstall, { Radio, RadioGroup } from './radio'
import RateInstall, { Rate } from './rate'
import RippleInstall, { RippleDirective } from './ripple'
import SearchInstall, { Search } from './search'
import SelectInstall, { Select } from './select'
import SkeletonInstall, { Skeleton } from './skeleton'
import SliderInstall, { Slider } from './slider'
import SplitterInstall, { Splitter } from './splitter'
import StatusInstall, { Status } from './status'
import StepsGuideInstall, { StepsGuide } from './steps-guide'
import StickyInstall, { Sticky } from './sticky'
import SwitchInstall, { Switch } from './switch'
import TableInstall, { Table, Column } from './table'
import TabsInstall, { Tabs } from './tabs'
import TagInputInstall, { TagInput } from './tag-input'
import TextareaInstall, { Textarea } from './textarea'
import TimePickerInstall, { TimePicker } from './time-picker'
import ToastInstall, { Toast, ToastService } from './toast'
import TooltipInstall, { Tooltip } from './tooltip'
import TransferInstall, { Transfer } from './transfer'
import TreeInstall, { Tree } from './tree'
import UploadInstall, { Upload, MultiUpload } from './upload'

const installs = [
  AccordionInstall,
	AlertInstall,
	AnchorInstall,
	AvatarInstall,
	BadgeInstall,
	BreadcrumbInstall,
	ButtonInstall,
	CardInstall,
	CarouselInstall,
	CascaderInstall,
	CheckboxInstall,
	DatePickerInstall,
	DrawerInstall,
	EditableSelectInstall,
	FullscreenInstall,
	IconInstall,
	ImagePreviewInstall,
	InputInstall,
	InputNumberInstall,
	LayoutInstall,
	LoadingInstall,
	ModalInstall,
	OverlayInstall,
	PaginationInstall,
	PanelInstall,
	PopoverInstall,
	ProgressInstall,
	QuadrantDiagramInstall,
	RadioInstall,
	RateInstall,
	RippleInstall,
	SearchInstall,
	SelectInstall,
	SkeletonInstall,
	SliderInstall,
	SplitterInstall,
	StatusInstall,
	StepsGuideInstall,
	StickyInstall,
	SwitchInstall,
	TableInstall,
	TabsInstall,
	TagInputInstall,
	TextareaInstall,
	TimePickerInstall,
	ToastInstall,
	TooltipInstall,
	TransferInstall,
	TreeInstall,
	UploadInstall
]

export {
  Accordion,
	Alert,
	Anchor,
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	Card,
	Carousel,
	Cascader,
	Checkbox,
	DatePicker,
	StickSlider,
	Drawer,
	EditableSelect,
	EditableSelectOption,
	Fullscreen,
	Icon,
	ImagePreviewDirective,
	ImagePreviewService,
	Input,
	InputNumber,
	Layout,
	Content,
	Header,
	Footer,
	Aside,
	LoadingService,
	Loading,
	Modal,
	FlexibleOverlay,
	FixedOverlay,
	Pagination,
	Panel,
	Popover,
	Progress,
	QuadrantDiagram,
	Radio,
	RadioGroup,
	Rate,
	RippleDirective,
	Search,
	Select,
	Skeleton,
	Slider,
	Splitter,
	Status,
	StepsGuide,
	Sticky,
	Switch,
	Table,
	Column,
	Tabs,
	TagInput,
	Textarea,
	TimePicker,
	Toast,
	ToastService,
	Tooltip,
	Transfer,
	Tree,
	Upload,
	MultiUpload
}

export default {
  version: '0.0.1',
  install(app: App): void {
    installs.forEach((p) => app.use(p as any))
  }
}
