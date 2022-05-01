<template>
  <div>
    <p class="error">{{ error }}</p>
    <!--<el-button type="primary" plain @click="reload" size="small">重启相机</el-button>-->
    <!--<button @click="clickFlash">手电筒</button>-->

    <qrcode-stream
      :track="this.paintOutline"
      :camera="camera"
      :torch="torchActive"
      @decode="onDecode"
      @init="onInit"
      v-if="!destroyed">
      <div class="loading-indicator" v-if="loading">
        正在载入相机
      </div>

      <div v-if="validationSuccess" class="validation-success">
        登记成功!
      </div>

      <div v-if="validationFailure" class="validation-failure">
        失败!已领过饭
      </div>

      <div v-if="validationPending" class="validation-pending">
        等待服务器返回结果中...
      </div>
    </qrcode-stream>
  </div>
</template>

<script>
import {QrcodeStream} from 'vue-qrcode-reader'

export default {
  components: {QrcodeStream},

  data() {
    return {
      loading: false,
      destroyed: false,
      error: '',
      result: '',
      camera: 'auto',
      isValid: undefined,
      torchActive: false,
      torchNotSupported: false,
    }
  },

  computed: {
    validationPending() {
      return this.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess() {
      return this.isValid === true
    },

    validationFailure() {
      return this.isValid === false
    }
  },

  methods: {
    // 打开手电筒
    clickFlash() {
      switch (this.torchActive) {
        case true:
          this.torchActive = false
          break
        case false:
          this.torchActive = true
          break
        default:
          alert("设置手电筒失败")
      }
    },

    // 扫码时, 对二维码进行红框追踪, 没啥用, 只是显着高级
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const {x, y} of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },

    // 解码的结果
    async onDecode(result) {
      this.result = result
      console.log(result);

      this.turnCameraOff()

      // 后端接口处理数据中
      this.isValid = await this.pay(result)

      // 留1秒让用户看到最后的处理结果
      await this.timeout(1000)

      this.turnCameraOn()
    },

    // 进行消费记录
    pay(result) {
      return this.axios
        .get('/meal/pay?userId=' + result)
        .then(res => {
          return res.data
        })
        .catch(err => {
          console.log(err);
          // this.$notify.error({
          //   title: '错误',
          //   message: '系统出错,请重试或联系管理员'
          // });
        })
    },

    // 手动打开相机
    turnCameraOn() {
      this.camera = 'auto'
    },

    // 手动关闭相机
    turnCameraOff() {
      this.camera = 'off'
    },

    // 设置延迟
    timeout(ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    },

    // 初始化
    onInit(promise) {
      this.loading = true

      promise
        .catch(console.error)
        .then(this.resetValidationState)
        .finally(this.ending)
    },

    // 结束时的回调
    ending() {
      this.loading = false
      console.log("结束!")
    },

    // 初始化时赋值
    resetValidationState() {
      this.isValid = undefined
    },

    // 重启相机, 没啥用
    async reload() {
      this.destroyed = true
      await this.$nextTick()
      this.destroyed = false
    }
  }
}
</script>

<style scoped>
button {
  margin-bottom: 20px;
}

.loading-indicator {
  background-color: rgba(239, 71, 93, .8);
  font-weight: bold;
  font-size: 0.5rem;
  text-align: center;
}

.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.validation-success {
  color: green;
}

.validation-failure {
  color: red;
}
</style>
