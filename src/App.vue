<template>
  <div v-if="!isUsersLoading" class="attach">
    <h2>Наши топ-блогеры</h2>
    <div class="slider_case">
        <v-slider v-bind="options">
          <div class="item user" v-for="user in users" :key="user.id" @click="loadPosts(user)">
            <img class="user__image" :src="user.image">
            <div class="user__name">
              {{ user.name }}
            </div>
            <div class="user__company">
              {{ user.company.name }}
            </div>
          </div>
        </v-slider>
    </div>
  </div>

  <div v-else>Идет загрузка...</div>

  <h2>3 актуальных поста 
      <span>{{ nameCompany }}</span>
  </h2>
  <transition-group name="animate">
    <div class="post" v-for="post in posts" :key="post.id">
    <div class="post__title">
      {{ post.title }}
    </div>
    <div class="post__body">
      {{ post.body }}
    </div>
  </div>
  </transition-group>
</template>

<script>
import slider from './slider.vue'
import axios from 'axios'

export default {
  data() {
    return {
      isUsersLoading: false,
      nameCompany: 'Company Name',
      users: [],
      posts: [],
      page: 1,
      limit: 3,
      options: {
        items: 4,
        margin: 20,
        nav: true,
        dots: false,
        loop: true,
        timing: 'cubic-bezier(0, 0.72, 0.64, 1.06)',
        offset: 1,
        prevNav: '<-',
        nextNav: '->',
        sibling: false,
        // responsive : {
        //   0: {
        //       items: 1
        //   },
        //   768: {
        //       items: 3
        //   },
        //   999: {
        //       items: 5
        //   }
        // }
      },
    }
  },
  components: {
      'v-slider': slider,
  },
  methods: {
    loadPosts(user) {
      this.nameCompany = user.company.name
      if (this.page === 10) {
        this.page = 1
      } else {
        this.page = this.page + 1
      }
      this.fetchPosts()
    },
    async fetchUsers() {
      try {
        this.isUsersLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/users?_limit=10')
        this.users = response.data
        for (let i = 0; i < this.users.length; i++) {
          this.users[i].image = randomImage()
        }
      } catch(e) {
        console.log('ошибка 1')
      } finally {
        this.isUsersLoading = false
      }
    },
    async fetchPosts() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts'
        , {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.posts = response.data
      } catch(e) {
        console.log('ошибка 2')
      } finally {
      }
    },
  },
  mounted() {
      this.fetchUsers()
      this.fetchPosts()
  },
}

function randomImage() {
  let rand = 50 + Math.random() * (100 + 1 - 50);
  return `https://i.pravatar.cc/${Math.floor(rand)}`
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  outline: none;
}

body {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 4vh 4vw;
  color: #333;
}

#app {
  width: 100%;
}

h2 {
  text-align: center;
}

.user {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  align-items: center;
}

.user__image {
  width: 50px;
}

.post {
  display: flex;
  margin: 10px 0;
  align-items: center;
}

.post__title {
  font-weight: 700;
}

.animate-move,
.animate-enter-active,
.animate-leave-active {
  transition: all 0.3s ease;
}

.animate-enter-from,
.animate-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
