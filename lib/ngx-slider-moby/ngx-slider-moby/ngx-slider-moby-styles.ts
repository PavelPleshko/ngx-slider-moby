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
  transition:width 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: #6a1b9a;
  width: 0;
  height: 5px;
  position: relative;
  transform-origin: 0 0;
  opacity: .7;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb-container1,
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb-container2 {
  position: absolute;
  display: flex;
  justify-content: center;
  width:10px;
  height:10px;
  will-change: transform;
    transition:300ms cubic-bezier(0.25, 0.8, 0.25, 1);

}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb1, 
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb2 {
 position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transition: inherit;
  background-color: inherit;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  top: 10px !important;
  transition:opacity,width,height,transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb2 {  
  display: none;
}

.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-active .ngx-slider-moby-thumb1, 
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-active .ngx-slider-moby-thumb2 {
  transform-origin: 50% 50%;
  transform: scale(1.15, 1.15) translateX(-50%);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-active .ngx-slider-moby-track-fill {
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
  opacity: 1;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb-label1, 
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb-label2 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: 1;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  padding: .3em 1em;
  transition:opacity,width,height,transform 300ms;
  background: rgba(106, 27, 154, 0.7);
  color: #fff;
}
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb-label1:after, 
.slider-main:not(.ngx-banner-slider-vertical) .ngx-slider-moby-thumb-label2:after {
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
  display:none;
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
  left: 50%;
  transform: translateX(-50%);
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
  background-color: #6a1b9a;
  height: 0;
  width: 5px;
  position: relative;
  transition:height 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: 0 0;
  opacity: .7;
}
.ngx-banner-slider-vertical .ngx-slider-moby-thumb-container1,
.ngx-banner-slider-vertical .ngx-slider-moby-thumb-container2 {
  position: absolute;
  display: flex;
  justify-content: center;
  width:10px;
  height:10px;
  left:50%;
  transition:transform 300ms cubic-bezier(0.25, 0.8, 0.25, 1);

}



.ngx-banner-slider-vertical .ngx-slider-moby-thumb2 {
  display: none;
}
.ngx-banner-slider-vertical .ngx-slider-moby-thumb1,
 .ngx-banner-slider-vertical .ngx-slider-moby-thumb2 {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  top:50%;
  transform:translateY(-50%);
  z-index: 1;
  transition: transform 300ms;
  cursor: pointer;
  left: -7px;
}
.ngx-banner-slider-vertical .ngx-slider-moby-active .ngx-slider-moby-thumb1,
 .ngx-banner-slider-vertical .ngx-slider-moby-active .ngx-slider-moby-thumb2 {
  transform:translateY(-50%) scale(1.2, 1.2);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
}
.ngx-banner-slider-vertical .ngx-slider-moby-active .ngx-slider-moby-track-fill {
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.3);
  opacity: 1;
}
.ngx-banner-slider-vertical .ngx-slider-moby-thumb-label1, 
.ngx-banner-slider-vertical .ngx-slider-moby-thumb-label2 {
  align-items: center;
  justify-content: center;
  position: absolute;
  opacity: 1;
  left: 18px;
  top: 50%;
  transform:translateY(-50%);
  border-radius: 4px;
  padding: .3em 1em;
  transition-property: opacity,width,height,border-radius;
  background: rgba(106, 27, 154, 0.7);
  color: #fff;
}
.ngx-banner-slider-vertical .ngx-slider-moby-thumb-label1{
  display: flex;
}

.ngx-banner-slider-vertical .ngx-slider-moby-thumb-label1:after,
 .ngx-banner-slider-vertical .ngx-slider-moby-thumb-label2:after {
  content: '';
  position: absolute;
  border-color: inherit;
  border-width: 7px;
  border-style: solid;
  border-left: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-top: 7px solid transparent;
  left: -14px;
  top: 50%;
  transform: translateY(-50%);
}
.ngx-banner-slider-vertical .ngx-slider-moby-container:not(.ngx-slider-moby-thumb-label-show1) .ngx-slider-moby-thumb-label1,.ngx-banner-slider-vertical .ngx-slider-moby-container:not(.ngx-slider-moby-thumb-label-show2) .ngx-slider-moby-thumb-label2 {
  display:none;
}
.ngx-banner-slider-disabled {
  pointer-events: none;
  opacity: .5;
}
.ngx-banner-slider-disabled .ngx-slider-moby-thumb-label1, 
.ngx-banner-slider-disabled .ngx-slider-moby-thumb-label2 {
  display: none !important;
}
`