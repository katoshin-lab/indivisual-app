<template>
  <div>
    <h3>掲示板に投稿する</h3>
    <label for="name">ニックネーム：</label>
    <input
      id="name"
      type="text"
      v-model="name"
    >
    <br>
    <label for="comment">コメント：</label>
    <textarea
      id="commnet"
      v-model="comment"
    ></textarea>
    <br>
    <button @click="createComment">コメントをサーバーに送る</button>
    <h2>掲示板</h2>
    <transition-group
      name="fade"
      mode="out-in"
    >
      <div
        v-for="post in posts"
        :key="post.name"
        class="post-box"
      >
        <div>名前：{{ post.fields.name.stringValue }}</div>
        <div>コメント：{{ post.fields.comment.stringValue }}</div>
      </div>
    </transition-group>
  </div>
</template>

<script>
// import axios from 'axios';
import axios from 'axios'

export default {
  data() {
    return {
      name: "",
      comment: "",
      posts: []
    }
  },
  created() {             // ロード時に実行
    axios.get(
      '/comments'
      )
    .then(response => {
      this.posts = response.data.documents;
    })
  },
  methods: {
    createComment() {
      axios.post(
        '/comments',        // baseURLを使用
        {                   // postの引数（url, data, ヘッダーなどの設定）
          fields: {                 // cloud firestoreではこの型が必要
            name: {                 // オブジェクトでカラム
              stringValue: this.name      // このような形でデータを送る
            },
            comment: {
              stringValue: this.comment
            }
          }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      this.name = "";
      this.comment = "";
    }
  }
}
</script>

<style lang="scss" scoped>
  .post-box {
    padding: 10px;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

</style>
