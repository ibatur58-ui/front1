<template>
  <div class="home-wrapper">
    <button v-if="userRole" @click="logout" class="logout-btn">
      Odjava
    </button>

    <div class="home-box">
      <h1 class="slogan">Autopraonica Clean</h1>
      <h2 class="sub-slogan">Dobrodošli – odaberite opciju</h2>

      <div class="user-greeting">
        <p v-if="userRole === 'admin'"> Dobrodošao natrag!</p>
        <p v-else-if="userRole === 'client'"> Pozdrav klijente!</p>
        <p v-else>🎉 Dobrodošli! Nastavite kroz izbornik</p>
      </div>

      <div class="menu-grid">
        <div class="menu-item" v-for="item in menuLinks" :key="item.label">
          <router-link :to="item.path" class="menu-link">
            <span class="icon">{{ item.emoji }}</span>
            <span class="label">{{ item.label }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomeStart",

  computed: {
    ...mapGetters("auth", ["userRole"]),

    menuLinks() {
      return [
        { path: "/reservations", label: "Rezervacije", emoji: "📅" },
        { path: "/services", label: "Usluge", emoji: "🔧" },
        { path: "/profile", label: "Moj Profil", emoji: "🙍‍♂️" },
      ];
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {
        localStorage.clear();
        this.$router.replace("/login");
      });
    },
  },
};
</script>

<style scoped>
.home-wrapper {
  background: url("@/assets/pozadina.jpg") no-repeat center top;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
}

.home-box {
  background-color: rgba(0, 0, 0, 0.6); 
  padding: 3rem 4rem;
  border-radius: 40px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.4);
  max-width: 800px;
  width: 90%;
  text-align: center;
}

.slogan {
  font-family: 'Sacramento', 'Papyrus', cursive;
  font-size: 60px;
  color: white;
  text-shadow: 0 0 15px rgba(0, 0, 0, 1);
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
}

.sub-slogan {
  color: white;
  font-size: 22px;
  margin-bottom: 2rem;
  font-weight: 300;
  letter-spacing: 1px;
}

.user-greeting {
  color: #ffd700;
  font-weight: 600;
  margin-bottom: 2rem;
  font-size: 18px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1.5rem;
}

.menu-item {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
  box-shadow: 0 0 12px #fff;
}

.menu-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  text-decoration: none;
  color: white;
}

.icon {
  font-size: 35px;
  margin-bottom: 10px;
}

.label {
  font-weight: 500;
  font-size: 16px;
}

.logout-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  padding: 12px 25px;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  z-index: 1000;
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}

@media (max-width: 600px) {
  .slogan { font-size: 40px; }
  .home-box { padding: 2rem; }
  .menu-grid { grid-template-columns: 1fr 1fr; }
}
</style>
