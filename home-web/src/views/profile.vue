<template>
  <div>
    <h1 v-if="!is_login">Please Connect Wallet First</h1>
    <h1 v-else>My Profile</h1>
    <div v-if="is_login" class="content">
      <div class="avatar">
        <img :src="avatar" />
      </div>
      <div class="info">
        <div>
          <h5>address:</h5>
          <div class="text">
            <span>{{ user.address }}</span>
          </div>
        </div>
        <div>
          <h5>wallet_type:</h5>
          <div class="text">
            <span>{{ user.wallet_type }}</span>
          </div>
        </div>
        <div>
          <h5>nick_name:</h5>
          <div class="text" v-if="!is_edit">
            <span>{{ user.nick_name }}</span>
          </div>
          <input v-else v-model="user.nick_name" />
        </div>
        <div>
          <h5>twitter:</h5>
          <div class="text" v-if="!is_edit">{{ user.twitter }}</div>
          <input v-else v-model="edit_user.twitter" />
        </div>
        <div>
          <h5>LinkedIn:</h5>
          <div class="text" v-if="!is_edit">{{ user.linked_in }}</div>
          <input v-else v-model="edit_user.linked_in" />
        </div>
        <div>
          <h5>github:</h5>
          <div class="text" v-if="!is_edit">{{ user.github }}</div>
          <input v-else v-model="edit_user.github" />
        </div>
        <div>
          <h5>instagram:</h5>
          <div class="text" v-if="!is_edit">{{ user.instagram }}</div>
          <input v-else v-model="edit_user.instagram" />
        </div>
        <div>
          <h5>facebook:</h5>
          <div class="text" v-if="!is_edit">{{ user.facebook }}</div>
          <input v-else v-model="edit_user.facebook" />
        </div>
        <div>
          <h5>telegram:</h5>
          <div class="text" v-if="!is_edit">{{ user.telegram }}</div>
          <input v-else v-model="edit_user.telegram" />
        </div>
        <div>
          <h5>discord:</h5>
          <div class="text" v-if="!is_edit">{{ user.discord }}</div>
          <input v-else v-model="edit_user.discord" />
        </div>
        <div>
          <button v-if="!is_edit" @click="setEdit">edit</button>
          <button v-if="is_edit" @click="update">save</button>
          <button v-if="is_edit" @click="cancelEdit">cencel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "../utils/auth";
import avatar from "../assets/avatar.png";
import { getUser, updateUser } from "../api/user";
export default {
  name: "profile",
  data() {
    return {
      address: "",
      avatar: avatar,
      is_login: false,
      is_edit: false,
      user: {
        address: "",
        wallet_type: "",
        avatar: "",
        nick_name: "",
        twitter: "",
        linked_in: "",
        github: "",
        instagram: "",
        facebook: "",
        telegram: "",
        discord: "",
      },
      edit_user: {},
    };
  },
  mounted() {
    const addr = getToken();
    if (addr) {
      this.is_login = true;
      this.address = addr;
      this.loadData();
    }
  },
  methods: {
    setEdit() {
      this.edit_user = this.user;
      this.is_edit = true;
    },
    cancelEdit() {
      this.is_edit = false;
      this.loadData();
    },
    loadData() {
      getUser(this.address, "metamask")
        .then((res) => {
          this.user = res.data.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    update() {
      updateUser(this.edit_user)
        .then((res) => {
          if ((this.user = res.data.data)) {
            this.user = res.data.data;
            this.is_edit = false;
            alert("修改成功");
          } else {
            alert("失败" + res.data.msg);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>
<style scoped>
.content {
  display: flex;
  justify-content: flex-start;
}
.avatar {
}
.avatar img {
  width: 128px;
  height: 128px;
  border: 1px solid #a0a9be;
}
.info {
  margin-left: 10px;
}
.info .text {
  width: 500px;
  height: 24px;
}
.info input {
  width: 500px;
  height: 24px;
}
</style>
