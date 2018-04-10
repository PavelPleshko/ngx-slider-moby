export const styles = `
.slider-main:not(.ngx-banner-slider-vertical) {
  height: 48px;
  min-width: 128px;
  position: relative;
  display: inline-block;
  outline: none;
  vertical-align: middle;
  width: 100%;
  user-select: none;
  box-sizing: border-box;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-wrapper {
  width: 100%;
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-container {
  position: relative;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-track-container {
  width: 100%;
  position: absolute;
  top: 16px;
  height: 5px;
  overflow: hidden;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-track {
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(117, 117, 117, 0.26);
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-track-fill {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: #6a1b9a;
  width: 0;
  height: 5px;
  position: relative;
  transform-origin: 0 0;
  opacity: .7;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb-container {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: left, bottom;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb1, .slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb2 {
  z-index: 1;
  position: absolute;
  top: 19.5px;
  left: -4.5px;
  width: 9px;
  height: 9px;
  border-radius: 9px;
  width: 0;
  height: 0;
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  top: 10px !important;
  border-radius: 50%;
  cursor: pointer;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb1 {
  left: -5px !important;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb-position2 {
  position: absolute;
  right: -5px !important;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb2 {
  left: -7px;
  display: none;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb1:after, .slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb2:after {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transform: scale(1, 1);
  transition: inherit;
  background-color: inherit;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-active .ngx-slider-moby-thumb1:after, .slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-active .ngx-slider-moby-thumb2:after {
  transform: scale(1.2, 1.2);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-active .ngx-slider-moby-track-fill {
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
  opacity: 1;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb-label1, .slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb-label2 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: 1;
  left: -22px;
  top: -30px;
  border-radius: 4px;
  padding: .3em 1em;
  animation: scaleUp 300ms forwards;
  transition: 300ms cubic-bezier(0.35, 0, 0.25, 1);
  transition-property: opacity,width,height,transform, border-radius;
  background: rgba(106, 27, 154, 0.7);
  color: #fff;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb-label1:after, .slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb-label2:after {
  content: '';
  position: absolute;
  border-color: inherit;
  border-width: 7px;
  border-style: solid;
  border-bottom: 7px solid transparent;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  bottom: -14px;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-container:not(.ngx-slider-moby-thumb-label-show1) .ngx-slider-moby-thumb-label1, .slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-container:not(.ngx-slider-moby-thumb-label-show2) .ngx-slider-moby-thumb-label2 {
  animation: scaleDown 300ms forwards;
}

.ngx-banner-slider-vertical {
  height: 100%;
  width: 2em;
  min-height: 144px;
  display: inline-block;
  user-select: none;
  box-sizing: border-box;
  position: relative;
  outline: none;
}
.ngx-banner-slider-vertical .ngx-slider-moby-wrapper {
  width: 100%;
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
}
.ngx-banner-slider-vertical .ngx-slider-moby-container {
  position: relative;
  height: 100%;
}
.ngx-banner-slider-vertical .ngx-slider-moby-track-container {
  height: 100%;
  position: absolute;
  width: 5px;
  overflow: hidden;
}
.ngx-banner-slider-vertical .ngx-slider-moby-track {
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(117, 117, 117, 0.26);
}
.ngx-banner-slider-vertical .ngx-slider-moby-track-fill {
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: #6a1b9a;
  height: 0;
  width: 5px;
  position: relative;
  transform-origin: 0 0;
  opacity: .7;
}
.ngx-banner-slider-vertical .ngx-slider-moby-thumb-container {
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: left, bottom;
}
.ngx-banner-slider-vertical .ngx-slider-moby-thumb1, .ngx-banner-slider-vertical .ngx-slider-moby-thumb2 {
  z-index: 1;
  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  position: absolute;
  left: -5px;
}
.ngx-banner-slider-vertical .ngx-slider-moby-thumb1 {
  top: 0;
}
.ngx-banner-slider-vertical .ngx-slider-moby-thumb-position2 {
  position: absolute;
  bottom: 0;
}
.ngx-banner-slider-vertical .ngx-slider-moby-thumb2 {
  display: none;
}
.ngx-banner-slider-vertical .ngx-slider-moby-thumb1:after, .ngx-banner-slider-vertical .ngx-slider-moby-thumb2:after {
  content: '';
  position: absolute;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  transform: scale(1, 1);
  transition: inherit;
  background-color: inherit;
}
.ngx-banner-slider-vertical .ngx-slider-moby-active .ngx-slider-moby-thumb1:after, .ngx-banner-slider-vertical .ngx-slider-moby-active .ngx-slider-moby-thumb2:after {
  transform: scale(1.2, 1.2);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
}
.ngx-banner-slider-vertical .ngx-slider-moby-active .ngx-slider-moby-track-fill {
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
  opacity: 1;
}
.ngx-banner-slider-vertical .ngx-slider-moby-thumb-label1, .ngx-banner-slider-vertical .ngx-slider-moby-thumb-label2 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: 1;
  left: 18px;
  top: -8px;
  border-radius: 4px;
  padding: .3em 1em;
  animation: scaleUp 300ms forwards;
  transition: 300ms cubic-bezier(0.35, 0, 0.25, 1);
  transition-property: opacity,width,height,transform, border-radius;
  background: rgba(106, 27, 154, 0.7);
  color: #fff;
}
.ngx-banner-slider-vertical .ngx-slider-moby-thumb-label1:after, .ngx-banner-slider-vertical .ngx-slider-moby-thumb-label2:after {
  content: '';
  position: absolute;
  border-color: inherit;
  border-width: 7px;
  border-style: solid;
  border-left: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-top: 7px solid transparent;
  left: -14px;
}
.ngx-banner-slider-vertical .ngx-slider-moby-container:not(.ngx-slider-moby-thumb-label-show1) .ngx-slider-moby-thumb-label1, .ngx-banner-slider-vertical .ngx-slider-moby-container:not(.ngx-slider-moby-thumb-label-show2) .ngx-slider-moby-thumb-label2 {
  animation: scaleDown 300ms forwards;
}

.ngx-banner-slider-disabled {
  pointer-events: none;
  opacity: .5;
}
.ngx-banner-slider-disabled .ngx-slider-moby-thumb-label1, .ngx-banner-slider-disabled .ngx-slider-moby-thumb-label2 {
  display: none !important;
}

@keyframes scaleDown {
  from {
    display:inline-block;
    opacity: 1;
    width: 20px;
    height: 20px;
  }
  to {
    display:none;
    width: 0;
    height: 0;
    opacity: 0;
  }
}
@keyframes scaleUp {
  from {
      display:none;
    width: 0;
    height: 0;
    opacity: 0;
  }
  to {
     display:inline-block;
    opacity: 1;
    width: 20px;
    height: 20px;
  }
}
`