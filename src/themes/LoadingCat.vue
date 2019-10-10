<template>
  <div class="fun-loading fun-loading-cat">
    <div class="cat-scene">
      <div class="bed"></div>
      <div class="cat">
        <div class="head">
          <div class="nose"></div>
        </div>
        <div class="body"></div>
        <div class="tail"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'LoadingCat',
    data() {
      return {
        loadingText: 'Loading...'
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

  .fun-loading-cat {
    background: lightblue;
    filter: grayscale(.1);

    .cat-scene {
      position: absolute;
      top: 50%;
      left: 50%;

      .bed {
        position: absolute;
        margin: 0 -90px;
        width: 180px;
        height: 20px;
        border-radius: 1000px;
        background: #e55;

        @function column($h, $l, $c) {
          $i: 1;
          $result: '0 #{$i*$h}px '+$c;
          @for $i from 2 through $l {
            $result: $result+', 0 #{$i*$h}px '+$c;
          }
          @return unquote($result);
        }

        &:before {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin: 0 -20px;
          width: 40px;
          height: 6px;
          border-radius: inherit;
          background: #fed;
          box-shadow: column(6, 30, #fed);
        }
      }

      .cat {
        position: absolute;
        bottom: 0;
        background: #745;
        /*box-shadow: inset 0 0 0 1px;*/

        .head {
          position: absolute;
          z-index: 1;
          bottom: 0;
          left: -70px;
          width: 50px;
          height: 30px;
          border-radius: 25px 25px 2px 2px / 26px 26px 4px 4px;
          background: inherit;
          box-shadow: inherit;

          &:before, &:after {
            content: '';
            position: absolute;
            z-index: -1;
            bottom: 0;
            background: inherit;
            box-shadow: inherit;
          }

          &:before {
            left: 0;
            width: 18px;
            height: 36px;
            border-radius: 13px 5px 0 2px / 32px 36px 0 4px;
          }

          &:after {
            right: 3px;
            width: 20px;
            height: 40px;
            border-radius: 5px 15px 0 0 / 40px 40px 0 0;
          }

          .nose {
            position: absolute;
            bottom: 10px;
            left: 50%;
            margin: 0 -2px;
            width: 3px;
            height: 2px;
            border-radius: 50%;
            background: #e55;

            &:before, &:after {
              content: '';
              position: absolute;
              left: 7px;
              width: 18px;
              height: 1px;
              background: #fed;
              transform-origin: left center;
            }

            &:before {
              transform: rotate(20deg);
              box-shadow: -30px 4px #fed;
            }

            &:after {
              transform: rotate(-20deg);
              box-shadow: -30px -4px #fed;
            }
          }
        }

        .body {
          position: absolute;
          bottom: 0;
          left: -30px;
          width: 100px;
          height: 55px;
          border-radius: 60px 40px 5px 5px / 45px 45px 10px 10px;
          background: inherit;
          box-shadow: inherit;
        }

        .tail {
          position: absolute;
          top: -10px;
          right: -70px;
          width: 12px;
          height: 90px;
          background: inherit;

          &:before {
            content: '';
            position: absolute;
            top: 100%;
            width: 12px;
            height: 6px;
            border-radius: 0 0 6px 6px;
            background: inherit;
          }
        }
      }
    }
  }
</style>
