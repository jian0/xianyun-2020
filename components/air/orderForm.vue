<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in form.users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×${form.users.length}  最高赔付${item.compensation}`"
            @change="handleInsurance(item.id)"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <span>{{allPrice}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        users: [
          {
            username: "",
            id: ""
          }
        ],
        insurances: [], // 保险数据
        contactName: "", // 联系人名字
        contactPhone: "", // 联系人电话
        captcha: "000000", // 验证码
        invoice: false, // 发票
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      },
      // 当前机票的详细信息
      infoData: {}
    };
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: "/airs/" + id,
      params: {
        seat_xid
      }
    }).then(res => {
      // 赋值给机票的详细信息
      this.infoData = res.data;

      // 把infoData保存到store
      this.$store.commit("air/setOrderDetail", this.infoData);
      // console.log(this.infoData);
    });
  },
  computed: {
    // users() {
    //   this.$store.commit("setUsers", 1);
    // },
    allPrice() {
      if (!this.infoData.seat_infos) return;
      let price = 0;
      // 单价
      price += this.infoData.seat_infos.par_price;
      // 油价
      price += this.infoData.airport_tax_audlet;
      // 保险
      this.infoData.insurances.forEach(v => {
        if (this.form.insurances.indexOf(v.id) > -1) {
          price += v.price;
        }
      });
      // 人数
      price *= this.form.users.length;
      this.$store.commit("air/setAllPrice", price);
      return "";
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.form.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.form.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      if (!this.form.contactPhone) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      if (this.form.contactPhone.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      this.$axios({
        url: `/captchas`,
        method: "POST",
        data: {
          tel: this.form.contactPhone
        }
      }).then(res => {
        const { code } = res.data;
        this.$confirm(`模拟手机验证码为：${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },

    //   保险服务,如果有id的话，点击了就清除id，就是没被选中
    handleInsurance(id) {
      const index = this.form.insurances.indexOf(id);
      if (index > -1) {
        this.form.insurances.splice(index, 1);
      } else {
        this.form.insurances.push(id);
      }
      //   console.log(this.insurances);
    },

    // 提交订单
    handleSubmit() {
      const rules = {
        users: {
          errMessage: "乘机人信息不能为空",
          validator: () => {
            let valid = true;
            this.form.users.forEach(v => {
              if (!v.username || !v.id) {
                valid = false;
              }
            });
            return valid;
          }
        },
        contactName: {
          errMessage: "联系人姓名不能为空",
          validator: () => {
            return !!this.form.contactName;
          }
        },
        contactPhone: {
          errMessage: "联系人电话不能为空",
          validator: () => {
            return !!this.form.contactPhone;
          }
        },
        captcha: {
          errMessage: "验证码不能为空",
          validator: () => {
            return !!this.form.captcha;
          }
        }
      };

      let valid = true;
      Object.keys(rules).forEach(v => {
        if (!valid) return;
        const item = rules[v];
        valid = item.validator();
        if (!valid) {
          this.$message.error(item.errMessage);
        }
      });

      //   如果验证没通过，中断操作
      if (!valid) return;
      //   发送提交订单的请求
      this.$axios({
        url: "/airorders",
        method: "POST",
        data: this.form,
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        this.$message.success("提交成功");

        // 跳转到支付页面
        setTimeout(() => {
          this.$router.push({
            path: "/air/pay",
            query: {
              id: res.data.data.id // 订单id
            }
          });
        }, 1500);
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>