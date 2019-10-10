<template>
  <div class="fun-loading fun-loading-lattice">
    <div class="lattice" :style="{borderColor: borderColor, background: background}">
      <div class="lattice-row clearfix" v-for="(row, i) in lattice" :key="i">
        <div class="lattice-col" :style="{borderColor: borderColor, background: col.colored ? color : 'transparent'}"
             @click="col.colored = !col.colored"
             v-for="(col, j) in row" :key="j"></div>
      </div>
    </div>
    <div class="lattice-toolbar">
      <div class="lattice-button" @click="saveLattice()">SAVE</div>
      <div class="lattice-button" @click="clearLattice()">CLEAR</div>
      <div class="lattice-button" @click="revertLattice()">REVERT</div>
      <div class="lattice-button"><span>MOVE</span>
        <div class="lattice-button top" @click="moveLattice('up')">↑</div>
        <div class="lattice-button bottom" @click="moveLattice('down')">↓</div>
        <div class="lattice-button left" @click="moveLattice('left')">←</div>
        <div class="lattice-button right" @click="moveLattice('right')">→</div>
      </div>
    </div>
    <!--<div class="loading-text" v-text="loadingText" :style="{color: color}"></div>-->
  </div>
</template>
<script>
  export default {
    name: 'LoadingLattice',
    data() {
      return {
        loadingText: 'Loading...',
        lattice: [],
        before: '[]',
        ctrl: {w: 40, h: 20},
        background: '#fff',
        borderColor: '#ddd',
        color: 'coral'
      }
    },
    watch: {
      'ctrl': {
        immediate: true,
        deep: true,
        handler(a, b) {
          console.warn('ctrl watcher')
          let w = a.w | 0
          let h = a.h | 0
          let lattice = []
          for (let i = 0; i < h; i++) {
            let row = this.lattice[i] || []
            let newRow = []
            for (let j = 0; j < w; j++) {
              newRow.push(row[j] || this.defaultCol())
            }
            lattice.push(newRow)
          }
          this.lattice = lattice
        }
      },
      'lattice': {
        deep: true,
        handler(a, b) {
          console.warn('lattice watcher')
          this.before = JSON.stringify(this.lattice || [])
        }
      }
    },
    mounted() {
      // localStorage.setItem('my_lattice', '[[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":true},{"colored":true},{"colored":true},{"colored":true},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}],[{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false},{"colored":false}]]')
      this.getLattice()
    },
    methods: {
      defaultCol() {
        return {colored: false}
      },
      defaultRow() {
        let row = []
        for (let i = 0, len = this.ctrl.w; i < len; i++) {
          row.push(this.defaultCol())
        }
        return row
      },
      clearLattice() {
        this.lattice.forEach(row => {
          row.forEach(col => {
            col.colored = false
          })
        })
      },
      revertLattice() {
        this.lattice = JSON.parse(this.before) || []
      },
      moveLattice(direction) {
        if (!(this.lattice instanceof Array)) return
        let lastI = this.ctrl.h - 1
        let lastJ = this.ctrl.w - 1
        switch (direction) {
          case 'up':
            for (let i = 0; i <= lastI; i++) {
              this.$set(this.lattice, i, this.lattice[i + 1] || this.defaultRow())
            }
            break;
          case 'down':
            for (let i = lastI; i >= 0; i--) {
              this.$set(this.lattice, i, this.lattice[i - 1] || this.defaultRow())
            }
            break;
          case 'left':
            this.lattice.forEach((row) => {
              for (let j = 0; j <= lastJ; j++) {
                this.$set(row, j, row[j + 1] || this.defaultCol())
              }
            })
            break;
          case 'right':
            this.lattice.forEach((row) => {
              for (let j = lastJ; j >= 0; j--) {
                this.$set(row, j, row[j - 1] || this.defaultCol())
              }
            })
            break;
        }
      },
      saveLattice() {
        localStorage.setItem('my_lattice', JSON.stringify(this.lattice || []))
        console.log(localStorage.getItem('my_lattice'))
      },
      getLattice() {
        let lattice = JSON.parse(localStorage.getItem('my_lattice') || '[]') || []
        this.lattice.forEach((row, i) => {
          let myRow = lattice[i] || []
          row.forEach((col, j) => {
            this.$set(row, j, myRow[j] || this.defaultCol())
          })
        })
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

  .fun-loading-lattice {
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: auto;

    .lattice {
      border: 1px solid;
      background: #fff;

      .lattice-row {
        clear: both;
      }

      .lattice-col {
        float: left;
        width: 10px;
        height: 10px;
        border: 1px solid;

        &.colored {
          background: coral;
        }
      }

    }

    .lattice-toolbar {
      position: absolute;
      top: 0;
      width: 100%;
      padding: 30px 20px;
      text-align: center;

      .lattice-button {
        display: none;
        position: relative;
        margin: 5px;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: .5em;
        text-align: center;
        box-shadow: 0 0 15px rgba(0, 0, 20, .4);
        background: cornflowerblue;
        color: #fff;
        cursor: pointer;

        .lattice-button {
          display: none;
          position: absolute;
          margin: 0;

          &.top {
            bottom: 100%;
            left: 0;
            right: 0;
          }

          &.left {
            right: 100%;
            top: 0;
            bottom: 0;
          }

          &.right {
            left: 100%;
            top: 0;
            bottom: 0;
          }

          &.bottom {
            top: 100%;
            left: 0;
            right: 0;
          }
        }

        &:hover {
          box-shadow: inset 0 0 15px;

          .lattice-button {
            display: block;
          }
        }
      }

      &:hover {
        > .lattice-button {
          display: inline-block;
        }
      }
    }
  }
</style>
