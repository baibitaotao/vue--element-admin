<template>
  <div class="link-tag-box" :style="{marginTop:cmarginTop+'px'}">
    <input ref="input" type="hidden" :value="value" @input="updateValue($event.target.value)">
    <div class="all"><span class="spa" :class="{allActiveClass:isActive}" @click="allTags">不限</span></div>
    <el-row>
      <el-col ref="menu" :span="24" :style="{maxWidth:cmaxWidth+'px'}"><div class="ul-contaier">
        <ul ref="menu" class="tag-nav" :class="{activeHeight:isActiveH}">
          <li v-for="(item, index) in options" :key="item.value" class="navItem" :class="item.checked === true?'activeClass':''" @click="changeTags(index)">
            <span>{{ item.label }}</span>
          </li>
        </ul>
        <div v-if="ismoreShow" class="col-handle">
          <a
            href="javascript:void(0)"
            class="open-btn icon-open-select"
            :class="{open:isActiveH}"
            @click="moreShow"
          />
        </div>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LinkTag',
  props: {
    value: [String, Number],
    contextPath: {
      // 请求地址
      type: String,
      default: '/yhhr-web'
    },
    parentId: {
      // 项目id
      type: String,
      default: ''
    },
    include: {
      type: String,
      default: null
    },
    cmaxWidth: {
      type: [String, Number],
      default: 700
    },
    cmarginTop: {
      type: Number,
      default: 10
    },
    dataArr: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isActive: true,
      isActiveH: false,
      ismoreShow: false,
      filterMore: true,
      multipleData: [],
      options: []
    }
  },
  computed: {
    getOptions() {
      for (let i = 0; i < this.options.length; i++) {
        this.options[i] = Object.assign({}, this.options[i], {
          checked: false
        })
      }

      this.options = Object.assign({}, this.options)

      return this.options
    },
    myValue() {
      return this.value !== '' ? this.value.split(',') : []
    }
  },
  watch: {
    dataArr(arr) {
      if (arr.length > 0) {
        // this.updateParentCreateData(arr)
        // this.updateParentData(arr)
      }
    }
  },
  created() {
    var _self = this
    if (this.dataArr.length > 0) {
      this.updateParentCreateData(this.dataArr)
      return
    }
    // http://172.29.201.157:8080/yhhr-web/commonTCode/getCodeByParentId?parentId=2604
    axios({
      // 获取下拉data
      url:
            this.contextPath +
            '/commonTCode/getCodeByParentId?parentId=' +
            this.parentId,
      method: 'get'
    }).then(function(response) {
      if (response.data.status === '0') {
        if (response.data.data.options) {
          _self.$nextTick(function() {
            let optionsArray = []
            // 处理包含
            const responseOptions = response.data.data.options

            if (_self.include) {
              const includeVals = _self.include.split(',')
              for (var i = 0; i < responseOptions.length; i++) {
                if (includeVals.includes(responseOptions[i].value)) {
                  optionsArray.push(responseOptions[i])
                }
              }
            } else {
              optionsArray = responseOptions
            }

            _self.options = optionsArray

            // 拿到父组件传入的value值
            this.myValue.forEach(function(v, k) {
              for (var i = 0; i < _self.options.length; i++) {
                // 拿到value值做对比
                if (_self.options[i].value === v) {
                  var obj = _self.options[i]
                  obj.checked = true
                  _self.$set(_self.options, i, obj)
                  _self.isActive = false
                }
              }
            })
          })
        }
      }
    })
    // var ul = document.getElementById("nav");
    // if(ul!=null){
    //    this.getInit()
    // }
  },
  mounted: function() {
    const _self = this
    if (this.dataArr.length > 0) {
      this.updateParentData(this.dataArr)
      return
    }
    this.$nextTick(function() {
      // 获取width
      axios({
        // 获取下拉data
        url:
                this.contextPath +
                '/commonTCode/getCodeByParentId?parentId=' +
                this.parentId,
        method: 'get'
      }).then(function(response) {
        if (response.data.data.options) {
          const ul_width = _self.$refs.menu.offsetWidth + 30
          const optionsLength = response.data.data.options.length
          const numWidth = optionsLength * 100
          if (numWidth > ul_width) { // 展开显示
            _self.ismoreShow = true
          } else { // 隐藏
            _self.ismoreShow = false
          }
        }
      })
    })
  },
  methods: {
    updateParentData(arr) {
      const _self = this
      this.$nextTick(function() {
        // const ul_width = _self.$refs.menu.$el.clientWidth + 30
        const ul_width = _self.cmaxWidth
        const optionsLength = arr.length
        const numWidth = optionsLength * 100
        // const numWidth = _self.$refs.menu.$el.clientWidth

        if (numWidth > ul_width) { // 展开显示
          _self.ismoreShow = true
        } else { // 隐藏
          _self.ismoreShow = false
        }
      })
    },
    updateParentCreateData(arr) {
      const _self = this
      this.$nextTick(function() {
        let optionsArray = []
        // 处理包含
        const responseOptions = arr

        if (_self.include) {
          const includeVals = _self.include.split(',')
          for (var i = 0; i < responseOptions.length; i++) {
            if (includeVals.includes(responseOptions[i].value)) {
              optionsArray.push(responseOptions[i])
            }
          }
        } else {
          optionsArray = responseOptions
        }

        _self.options = optionsArray

        // 拿到父组件传入的value值
        this.myValue.forEach(function(v, k) {
          for (var i = 0; i < _self.options.length; i++) {
            // 拿到value值做对比
            if (_self.options[i].value === v) {
              var obj = _self.options[i]
              obj.checked = true
              _self.$set(_self.options, i, obj)
              _self.isActive = false
            }
          }
        })
      })
      return
    },
    // 不是直接更新值，而是使用此方法来对输入值进行格式化和位数限制
    updateValue: function(value) {
      // var formattedValue = value.trim()
      var formattedValue = value
      // 如果值不统一，手动覆盖以保持一致
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue
      }
      // 通过input 事件发出数值
      this.$emit('input', formattedValue)
    },
    allTags() {
      // 不限
      // this.isActive = !this.isActive
      this.isActive = true
      this.updateValue('')
      // 为false时，样式标签不显示样式
      for (const j in this.options) {
        var obj = this.options[j]
        obj.checked = false
        this.$set(this.options, j, obj)
      }
      this.$emit('on-change-tag', '')
    },
    // 数组每一项加个checked属性记录一下就行了，点击时候把index传过去修改数据
    changeTags(index) {
      // 切换选中状态
      // 只要选中标签，不限样式不显示
      this.isActive = false
      var type = 1
      if (type == 1) {
        // 多选
        var obj = this.options[index]
        obj.checked = !obj.checked
        this.$set(this.options, index, obj)
        if (this.options[index].checked == true) {
          // 点击选中

          this.myValue.push(this.options[index].value)
          var valueString = this.myValue.join(',')
          this.updateValue(valueString)

          this.$emit('on-change-tag', valueString)
        } else {
          // 去掉选中
          var id = this.options[index].value
          var index = this.myValue.indexOf(id)
          this.myValue.splice(index, 1)

          var valueString = this.myValue.join(',')
          if (this.myValue.length == 0) {
            valueString = ''
            this.isActive = true
          }
          this.updateValue(valueString)

          this.$emit('on-change-tag', valueString)
        }
      }
      if (type == 2) {
        // 单选
      }
    },
    moreShow() {
      // 更多
      this.isActiveH = !this.isActiveH
    },
    clear() {
      this.allTags()
    }
  }
}
</script>

