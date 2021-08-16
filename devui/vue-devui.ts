import type { App } from 'vue'

import AccordionInstall, { Accordion } from './accordion'
import AlertInstall, { Alert } from './alert'
import AnchorInstall, { Anchor } from './anchor'
import AvatarInstall, { Avatar } from './avatar'
import ButtonInstall, { Button } from './button'
import CardInstall, { Card } from './card'
import CarouselInstall, { Carousel } from './carousel'
import CheckboxInstall, { Checkbox } from './checkbox'
import DatePickerInstall, { DatePicker, StickSlider } from './date-picker'
import IconInstall, { Icon } from './icon'
import InputInstall, { Input } from './input'
import LoadingInstall, { LoadingService, Loading } from './loading'
import PaginationInstall, { Pagination } from './pagination'
import PanelInstall, { Panel } from './panel'
import ProgressInstall, { Progress } from './progress'
import RadioInstall, { Radio } from './radio'
import RateInstall, { Rate } from './rate'
import SearchInstall, { Search } from './search'
import SelectInstall, { Select } from './select'
import StatusInstall, { Status } from './status'
import SwitchInstall, { Switch } from './switch'
import TabsInstall, { Tabs } from './tabs'
import TagInputInstall, { TagInput } from './tag-input'
import ToastInstall, { ToastService } from './toast'

const installs = [
  AccordionInstall,
	AlertInstall,
	AnchorInstall,
	AvatarInstall,
	ButtonInstall,
	CardInstall,
	CarouselInstall,
	CheckboxInstall,
	DatePickerInstall,
	IconInstall,
	InputInstall,
	LoadingInstall,
	PaginationInstall,
	PanelInstall,
	ProgressInstall,
	RadioInstall,
	RateInstall,
	SearchInstall,
	SelectInstall,
	StatusInstall,
	SwitchInstall,
	TabsInstall,
	TagInputInstall,
	ToastInstall
]

export {
  Accordion,
	Alert,
	Anchor,
	Avatar,
	Button,
	Card,
	Carousel,
	Checkbox,
	DatePicker,
	StickSlider,
	Icon,
	Input,
	LoadingService,
	Loading,
	Pagination,
	Panel,
	Progress,
	Radio,
	Rate,
	Search,
	Select,
	Status,
	Switch,
	Tabs,
	TagInput,
	ToastService
}

export default {
  version: '0.0.1',
  install(app: App): void {
    installs.forEach((p) => app.use(p as any))
  }
}
