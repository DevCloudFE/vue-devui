import { defineComponent } from 'vue';
import { skeletonProps, SkeletonProps } from './skeleton-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './skeleton.scss';

export default defineComponent({
  name: 'DSkeleton',
  props: skeletonProps,
  setup(props: SkeletonProps, ctx) {
    const { slots } = ctx;
    const ns = useNamespace('skeleton');

    function renderAnimate(isAnimated) {
      return isAnimated ? ns.e('animated') : '';
    }
    function renderBorderRadius(isRound) {
      return isRound ? 'border-radius: 1em;' : '';
    }
    function renderParagraph(isShown, rowNum, rowWidth, round) {
      const arr = [];

      function pushIntoArray(type) {
        for (let index = 0; index < rowNum; index++) {
          arr.push({ width: type });
        }
      }
      (function handleRowWidth() {
        if (rowWidth instanceof Array) {
          for (let index = 0; index < rowNum; index++) {
            if (rowWidth[index]) {
              switch (typeof rowWidth[index]) {
                case 'string':
                  arr.push({ width: rowWidth[index] });
                  break;
                case 'number':
                  arr.push({ width: `${rowWidth[index]}px` });
              }
            } else {
              arr.push({ width: 1 });
            }
          }
        } else {
          switch (typeof rowWidth) {
            case 'string':
              pushIntoArray(rowWidth);
              break;
            case 'number':
              pushIntoArray(`${rowWidth}px`);
              break;
          }
        }
      })();

      return (
        <div class={ns.e('paragraph')} v-show={isShown}>
          {arr.map((item) => {
            return <div class={ns.e('item')} style={round ? 'border-radius: 1em;' : '' + `width: ${item.width}`} />;
          })}
        </div>
      );
    }

    function renderAvatarStyle(avatarSize, avatarShape) {
      function renderAvatarShape() {
        return avatarShape === 'square' ? '' : 'border-radius:50%;';
      }
      function renderAvatarSize() {
        switch (typeof avatarSize) {
          case 'string':
            return `width:${avatarSize};height:${avatarSize};`;
          case 'number':
            return `width:${avatarSize}px;height:${avatarSize}px;`;
        }
      }

      return renderAvatarSize(avatarSize) + renderAvatarShape(avatarShape);
    }
    function renderTitle(isVisible, titleWidth, isRound) {
      function renderTitleWidth() {
        switch (typeof titleWidth) {
          case 'string':
            return `width: ${titleWidth};`;
          case 'number':
            return `width: ${titleWidth}px;`;
        }
      }
      function renderTitleVisibility() {
        return isVisible ? null : 'visibility: hidden;';
      }

      return renderTitleWidth(titleWidth) + renderBorderRadius(isRound) + renderTitleVisibility(isVisible);
    }
    function renderDefaultSkeleton() {
      return (
        <>
          <div class={ns.e('avatar')} v-show={props.avatar}>
            <div class="avatar" style={renderAvatarStyle(props.avatarSize, props.avatarShape)} />
          </div>
          <div class={ns.e('group')}>
            <div class={ns.e('title')} style={renderTitle(props.title, props.titleWidth, props.round)} />
            {renderParagraph(props.paragraph, props.row, props.rowWidth, props.round)}
          </div>
        </>
      );
    }

    return () => {
      if (props.loading) {
        return <div class={[ns.b(), renderAnimate(props.animate)]}>{renderDefaultSkeleton()}</div>;
      }
      return <>{slots.default?.()}</>;
    };
  },
});
