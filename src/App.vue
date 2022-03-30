<template>
  <div v-if="!isUsersLoading" class="page">
    <div class="attach bloggers">
      <h2 class="bloggers_title">Наши топ-блогеры</h2>
      <p class="bloggers_description">Лучше специалисты в своем деле, <br>
  средний опыт работы в профессии - 27 лет</p>
      <div class="slider_case container">
          <v-slider v-bind="options">
            <div class="item user" v-for="user in users" :key="user.id" @click="loadPosts(user)">
              <img class="user_image" :src="user.image">
              <div class="user_name">
                {{ user.name }}
              </div>
              <div class="user_company">
                {{ user.company.name }}
              </div>
            </div>
          </v-slider>
      </div>
    </div>

    <div class="posts">
      <div class="container">
        <h2 class=posts_title>3 актуальных поста 
            <span>{{ nameUser }}</span>
        </h2>
        <transition-group name="animate">
          <div class="post" v-for="post in posts" :key="post.id">
            <div class="post_title">
              {{ post.title }}
            </div>
            <div class="post_body">
              {{ post.body }}
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
  <div v-else>Идет загрузка...</div>

</template>

<script>
import slider from '@/slider.vue'
import axios from 'axios'

export default {
  data() {
    return {
      isUsersLoading: false,
      nameUser: '',
      users: [],
      posts: [],
      page: 1,
      limit: 3,
      options: {
        items: 4,
        margin: 46,
        nav: true,
        dots: false,
        loop: false,
        timing: 'cubic-bezier(0, 0.72, 0.64, 1.06)',
        offset: 1,
        prevNav: '',
        nextNav: '',
        sibling: false,
        responsive : {
          0: {
              items: 1
          },
          500: {
              items: 2
          },
          899: {
              items: 3
          },
          1200: {
              items: 4
          }
        }
      },
    }
  },
  components: {
      'v-slider': slider,
  },
  methods: {
    loadPosts(user) {
      this.nameUser = user.name
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
          this.users[i].image = this.randomImage()
        }
        this.nameUser = this.users[0].name
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
    randomImage() {
      let rand = 320 + Math.random() * (400 + 1 - 320);
      return `https://i.pravatar.cc/${Math.floor(rand)}`
    },
  },
  mounted() {
      this.fetchUsers()
      this.fetchPosts()
  },
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  outline: none;
}

body {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 0;
  color: #333;
}

#app {
  width: 100%;
}

.page {
  margin: 48px 0 100px;
}

.bloggers {
  width: 100%;
  background: transparent url(img/background.png) no-repeat right center;
}

.posts {
  width: 100%;
  background: transparent url(img/background2.png) no-repeat left bottom;
}

.bloggers_title, 
.bloggers_description,
.posts_title {
  text-align: center;
}

.bloggers_title {
  font-weight: 600;
  font-size: 48px;
  line-height: 48px;
  color: #384758;
  margin: 0 0 34px;
  letter-spacing: 1.5px;
}

.bloggers_description {
  font-weight: 300;
  font-size: 18px;
  line-height: 27px;
  color: #606F81;
  margin-bottom: 36px;
}

.container {
  width: 91.52777777777777vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.user {
  display: flex;
  flex-direction: column;
}

.posts_title, .post {
  width: 68vw;
  align-self: end;
  text-align: left;
}

.user:hover > .user_image {
  border-bottom: 5px solid #FE8700;
}

.user:hover > .user_name,
.user:hover > .user_company {
  color: #FE8700;
}

.user_image {
  width: 100%;
  max-width: 290px;
  height: 320px;
  object-fit: cover;
  border-bottom: 5px solid transparent;
}

.user_name {
  font-weight: 400;
  font-size: 24px;
  line-height: 36px;
  text-align: left;
  color: #384758;
  margin: 20px 0 1px;
}

.user_company {
  font-weight: 300;
  font-size: 18px;
  line-height: 27px;
  text-align: left;
  color: #606F81;
  margin-bottom: 8px;
}

.post {
  display: grid;
  grid-template-columns: 100%;
  margin: 0 0 19px;
  align-items: center;
}

.posts_title {
  font-weight: 600;
  font-size: 48px;
  line-height: 48px;
  color: #384758;
  margin-bottom: 54px;
  position: relative;
}

.posts_title:before {
  content: '';
  width: 100px;
  height: 78px;
  left: -134px;
  position: absolute;
  background:transparent url(img/quotes.svg) no-repeat center /100% ; 
}

.post_title {
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #384758;
  margin-bottom: 7px;
}

.post_body {
  font-weight: 300;
  font-size: 20px;
  line-height: 28px;
  color: #606F81;
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
