# Card 卡片

通用卡片容器。

### 何时使用

基础卡片容器，其中可包含文字，列表，图片，段落，用于概览展示时。


### 基本用法

<d-card class="d-card">
  <template v-slot:cardAvatar>
    <d-avatar name="DevUI"></d-avatar>
  </template>
  <template v-slot:cardTitle>
    DEVUI Course
  </template>
  <template v-slot:cardSubtitle class="icon">
    <d-icon name="company-member"></d-icon><span>DevUI</span>
  </template>
  <template v-slot:cardContent>
    DEVUI is a free open-source and common solution for the front end of enterprise mid- and back-end products. Its design values are basedon...
  </template>
  <template v-slot:cardActions>
    <div class="card-block">
      <d-icon name="like"></d-icon ><span>12</span>
    </div>
    <div class="card-block">
      <d-icon name="star-o"></d-icon ><span>8</span>
    </div>
    <div class="card-block">
      <d-icon name="message"></d-icon ><span>8</span>
    </div>
  </template>
</d-card>

```html
<d-card class="d-card">
  <template v-slot:cardAvatar>
    <d-avatar name="DevUI"></d-avatar>
  </template>
  <template v-slot:cardTitle>
    DEVUI Course
  </template>
  <template v-slot:cardSubtitle class="icon">
    <d-icon name="company-member"></d-icon><span>DevUI</span>
  </template>
  <template v-slot:cardContent>
    DEVUI is a free open-source and common solution for the front end of enterprise mid- and back-end products. Its design values are basedon...
  </template>
  <template v-slot:cardActions>
    <div class="card-block">
      <d-icon name="like"></d-icon ><span>12</span>
    </div>
    <div class="card-block">
      <d-icon name="star-o"></d-icon ><span>8</span>
    </div>
    <div class="card-block">
      <d-icon name="message"></d-icon ><span>8</span>
    </div>
  </template>
</d-card>
```

### 使用图片

通过align可设置d-card-actions操作区域对齐方式：起始对齐、尾部对齐、拉伸对齐。

<d-card class="d-card" src="https://devui.design/components/assets/image1.png">
  <template v-slot:cardAvatar>
    <d-avatar name="DevUI"></d-avatar>
  </template>
  <template v-slot:cardTitle>
    DEVUI Course
  </template>
  <template v-slot:cardSubtitle class="icon">
    <d-icon name="company-member"></d-icon><span>DevUI</span>
  </template>
  <template v-slot:cardContent>
    DEVUI is a free open-source and common solution for the front end of enterprise mid- and back-end products. Its design values are basedon...
  </template>
  <template v-slot:cardActions>
    <div class="card-block">
      <d-icon name="like"></d-icon ><span>12</span>
    </div>
    <div class="card-block">
      <d-icon name="star-o"></d-icon ><span>8</span>
    </div>
    <div class="card-block">
      <d-icon name="message"></d-icon ><span>8</span>
    </div>
  </template>
</d-card>

```html
<d-card class="d-card" src="https://devui.design/components/assets/image1.png">
  <template v-slot:cardAvatar>
    <d-avatar name="DevUI"></d-avatar>
  </template>
  <template v-slot:cardTitle>
    DEVUI Course
  </template>
  <template v-slot:cardSubtitle class="icon">
    <d-icon name="company-member"></d-icon><span>DevUI</span>
  </template>
  <template v-slot:cardContent>
    DEVUI is a free open-source and common solution for the front end of enterprise mid- and back-end products. Its design values are basedon...
  </template>
  <template v-slot:cardActions>
    <div class="card-block">
      <d-icon name="like"></d-icon ><span>12</span>
    </div>
    <div class="card-block">
      <d-icon name="star-o"></d-icon ><span>8</span>
    </div>
    <div class="card-block">
      <d-icon name="message"></d-icon ><span>8</span>
    </div>
  </template>
</d-card>
```

### 自定义区域

<d-card class="d-card" align="spaceBetween">
  <div class="custom-avatar">
    <d-avatar imgSrc="https://devui.design/components/assets/logo.svg" width=48 height=48 :isRound="false"></d-avatar>
    <div class="icon-star-o custom-star-action"></div>
  </div>
  <template v-slot:cardTitle>
    DEVUI Course
  </template>
  <template v-slot:cardActions>
    <div class="action-text">Updated at Dec 31 15:55</div>
    <div>
        <d-icon name="like"></d-icon >
        <d-icon name="more-operate"></d-icon >
    </div>
  </template>
</d-card>

```html
<d-card class="d-card" align="spaceBetween">
  <div class="custom-avatar">
    <d-avatar imgSrc="https://devui.design/components/assets/logo.svg" width=48 height=48 :isRound="false"></d-avatar>
    <div class="icon-star-o custom-star-action"></div>
  </div>
  <template v-slot:cardTitle>
    DEVUI Course
  </template>
  <template v-slot:cardActions>
    <div class="action-text">Updated at Dec 31 15:55</div>
    <div>
        <d-icon name="like"></d-icon >
        <d-icon name="more-operate"></d-icon >
    </div>
  </template>
</d-card>
```
<style lang="scss">
@import '@devui-design/icons/icomoon/devui-icon.css';
.icon {
  cursor: pointer;
  font-size: 16px;
  margin-right: 8px;
  vertical-align: middle;
}

.icon + span {
  vertical-align: middle;
}

.card-block {
  margin-right: 16px;
  i{
    cursor: pointer;
    font-size: 16px;
    margin-right: 8px;
    vertical-align: middle;
  }
  i + span {
    vertical-align: middle;
  }
}

.d-card {
  cursor: pointer;
  transition:
    box-shadow .3s cubic-bezier(.645,.045,.355,1),
    transform .3s cubic-bezier(.645,.045,.355,1);

  &:hover {
    box-shadow: 0 4px 16px 0 rgba(0,0,0,.1);
    transform: translateY(-5px);
  }
}

.card-container {
  width: 350px;
}
img {
  max-width: none;
}


.action-text {
  color: #8a8e99;
}
.custom-avatar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  .custom-star-action {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>