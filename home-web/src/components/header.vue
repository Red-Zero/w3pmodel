<template>
  <div>
    <div class="header">
      <div class="logo">
        <img alt="logo" src="@/assets/logo.png" />
      </div>
      <div>
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/profile">profile</router-link>
        </nav>
      </div>
      <div class="login">
        <div v-if="!is_login" class="wallet" @click="metamaskLogin">
          {{ account }}
        </div>
        <div v-else class="wallet">{{ account }}</div>
        <div v-if="is_login" class="logout">
          <button @click="logout">logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, setToken, removeToken } from "../utils/auth";
import { metamaskLogin } from "../api/user";
import moment from "moment";
import { ethers } from "ethers";
export default {
  name: "header",
  data() {
    return {
      account: "Connect Wallet",
      is_login: false,
    };
  },
  mounted() {
    // removeToken();
    const address = getToken();
    if (address && address != "undefined") {
      this.is_login = true;
      this.account = address;
    }
  },
  methods: {
    logout() {
      removeToken();
      this.account = "Connect Wallet";
      this.is_login = false;
      this.$router.push({ path: "/" });
    },
    async metamaskLogin() {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      const time = moment().unix();
      const message = `JUST LOGIN  ${time}`;
      const sign = await signer.signMessage(message);
      console.log(addr, sign, time, message);
      metamaskLogin(addr, sign, time, message)
        .then((res) => {
          console.log(res);
          this.is_login = true;
          this.account = res.data.data.address;
          setToken(this.account);
          this.$router.push({ path: "/profile" });
        })
        .catch((err) => {
          alert(err);
        });
      // 签名验证
      // this.$store
      //   .dispatch("user/login", { addr, sign, time, message })
      //   .then(() => {
      //     console.log(111111);
      //     this.$router.push({ path: "/" });
      //     this.loading = false;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     this.loading = false;
      //   });
    },
  },
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #a0a9be;
}
.header .logo {
  width: 32px;
  height: 53px;
}
.header .logo img {
  width: 100%;
  height: 100%;
}
nav {
  height: 53px;
  line-height: 53px;
}
nav a {
  margin: 0 10px;
}
.login {
  width: 100%;
  height: 53px;
  line-height: 53px;
  display: flex;
  justify-content: flex-end;
}
.login .wallet {
  height: 33px;
  line-height: 33px;
  border: 1px solid #a0a9be;
  border-radius: 20px;
  padding: 0 30px;
  margin-top: 10px;
}

.login .wallet:hover {
  background-color: #a0a9be;
  cursor: pointer;
}
.logout {
}
</style>
