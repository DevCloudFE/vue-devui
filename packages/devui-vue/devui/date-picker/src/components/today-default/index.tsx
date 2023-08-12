import { t } from '../utils';

type TProps = {
  onSelected?: (date: Date) => void;
  disabled?: boolean;
};

const TodayDefault = (props: TProps): JSX.Element => {
  const { onSelected = () => 0, disabled = false } = props;
  return (
    <div class={`today-container ${disabled ? 'disabled' : ''}`}>
      <button
        class="today-button"
        disabled={disabled}
        onClick={disabled ? undefined : () => onSelected(new Date())}
      >{t('today')}</button>
    </div>
  );
};

export default TodayDefault;
