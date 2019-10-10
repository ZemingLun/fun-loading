<template>
  <div class="fun-loading fun-loading-butterfly">
    <div class="origin">
      <div class="butterfly" :style="{color: butterflyColor, textShadow: '0 0 5px '+whiteColor, animationDuration: duration+'s', animationDelay: -(duration*.42)+'s'}">
        <div class="wing" :class="['wing-'+item]"
             :style="{background: butterflyColor, boxShadow: '-16px -16px 0 -2px '+butterflyColor}"
             v-for="(item, i) in ['left', 'right']" :key="'wing-'+item"></div>
        <div class="char" :style="{transform: 'rotate('+(-i*15-20)+'deg)'}" :data-text="item" v-for="(item, i) in loadingTextArr"
             :key="'char-'+i"></div>
      </div>
      <div class="cat" :style="{background: color}">
        <div class="ear" :class="['ear-'+item]" :style="{animationDuration: (duration/2)+'s', animationDelay: -(duration*.42)+'s'}" v-for="(item, i) in ['left', 'right']" :key="'ear-'+item"></div>
        <div class="eye" :class="['eye-'+item]" :style="{background: whiteColor}" v-for="(item, i) in ['left', 'right']"
             :key="'eye-'+item">
          <div class="pupil" :style="{background: butterflyColor, animationDuration: duration+'s'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'LoadingButterfly',
    data() {
      return {
        loadingText: 'Loading...',
        color: '#101',
        eyeColor: '#101',
        whiteColor: '#f4b860',
        duration: 3
      }
    },
    computed: {
      butterflyColor() {
        return (this.eyeColor || this.color)
      },
      loadingTextArr() {
        return this.loadingText.split('')
      }
    }
  }
</script>
<style scoped lang="scss">
  .fun-loading {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .fun-loading-butterfly {

    .origin {
      position: absolute;
      top: 50%;
      left: 50%;

      .cat {
        position: absolute;
        top: 10px;
        margin: -40px -50px;
        width: 100px;
        height: 80px;
        border-radius: 50px / 40px;
        background: #101;

        .ear {
          position: absolute;
          z-index: -1;
          bottom: 5px;
          left: 0;
          width: 40px;
          height: 80px;
          transform-origin: 50px 70px;
          /*border-radius: 20px 20px 0px 40px / 45px 80px 0 35px;*/
          background: inherit;
          animation: shake 1.5s -1.25s ease-in infinite alternate;

          &.ear-right {
            transform: scaleX(-1);
          }
        }

        .eye {
          position: absolute;
          top: 25px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: sandybrown;

          &.eye-left {
            left: 15px;
          }

          &.eye-right {
            right: 15px;
          }

          .pupil {
            position: absolute;
            margin: 5px;
            width: 18px;
            height: 18px;
            transform-origin: 7px 7px;
            border-radius: inherit;
            animation: revolve 3s linear infinite;
            background: #101;

            &:before {
              content: '';
              position: absolute;
              margin: 4px;
              width: 4px;
              height: 4px;
              transform-origin: 5px 5px;
              border-radius: inherit;
              background: snow;
              animation: inherit;
              animation-direction: reverse;
            }
          }
        }
      }

      .butterfly {
        position: absolute;
        margin: -120px;
        width: 240px;
        height: 240px;
        border-radius: 1000px;
        animation: revolve 3s -1.25s linear infinite;
        box-shadow: -3px -5px 0 -5px rgba(240, 248, 255, .2);

        &:before {
          content: '';
          position: absolute;
          top: 2px;
          left: 0px;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          box-shadow: inherit;
        }

        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          box-shadow: inset 3px 0 6px -3px rgba(240, 248, 255, .1);
        }

        .wing {
          /*content: '';*/
          position: absolute;
          left: 50%;
          width: 20px;
          height: 20px;
          border-radius: 4px 16px;
          box-shadow: -16px -16px 0 -2px #101;
          transform-origin: 0 0;
          background: #101;
          animation: flutter .6s linear infinite alternate;
        }

        .wing-right {
          transform: scaleY(-1);
        }

        .char {
          position: absolute;
          width: 100%;
          height: 100%;
          color: inherit;

          &:before {
            content: attr(data-text);
            position: absolute;
            left: 50%;
            margin: -25px;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            transform: rotate(90deg);
          }
        }
      }

      @keyframes revolve {
        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes flutter {
        100% {
          filter: brightness(2);
        }
      }

      @keyframes shake {
        0% {
          border-radius: 30px 10px 0px 40px / 45px 80px 0 35px;
        }
        100% {
          border-radius: 10px 30px 0px 40px / 45px 80px 0 35px;
        }
      }
    }
  }
</style>
