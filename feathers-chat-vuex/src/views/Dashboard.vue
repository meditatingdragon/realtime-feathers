<template>
  <main class="home container">
    <div class="row text-center">
      <h1>Dashboard</h1>
    </div>
    <div class="row">
      <div class="col-6">
        <h3>Messages Sent</h3>
        <BarChart :chart-data="barchartdata" :options="options" />
      </div>
      <div class="col-6">
        <h3>Active Chat Rooms</h3>
        <BarChart :chart-data="barchartdata2" :options="options" />
      </div>
    </div>
    <div class="row">
      <h3>Recent Logins</h3>
      <LineChart :chart-data="linechartdata" :options="options" />
    </div>
    <div class="row">
      <h3>Current Tasks</h3>
      <DonutChart :chart-data="donutchartdata" :options="doptions" />
    </div>
    <div class="row">
      <h3>DEBUG</h3>
      {{ serverMessage }}
    </div>
  </main>
</template>

<script>
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import DonutChart from '../components/DonutChart';
import feathersClient from '../feathers-client';
export default {
  name: 'Dashboard',
  components: {
    BarChart,
    DonutChart,
    LineChart,
  },
  data() {
    return {
      serverMessage: {},
      messageCount: 0,
      activeChatRooms: 0,
      recentLogins: [],
      openTickets: 0,
      closedTickets: 0,
      unassignedTickets: 0,
    };
  },
  computed: {
    donutchartdata() {
      return {
        labels: ['Open Tasks', 'Closed Tasks', 'Unassigned Tasks'],
        datasets: [
          {
            label: 'Current Tasks',
            data: [
              this.openTickets,
              this.closedTickets,
              this.unassignedTickets,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    },
    linechartdata() {
      return {
        labels: ['', '', '', '', '', '', ''],
        datasets: [
          {
            label: 'Recent Logins',
            data: this.recentLogins,
            fill: false,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
        ],
      };
    },
    barchartdata() {
      return {
        labels: ['Active Messages'],
        datasets: [
          {
            data: [this.messageCount],
            backgroundColor: ['rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255, 206, 86, 1)'],
            borderWidth: 1,
          },
        ],
      };
    },
    barchartdata2() {
      return {
        labels: ['Active Chat Rooms'],
        datasets: [
          {
            data: [this.activeChatRooms],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 1,
          },
        ],
      };
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    },
    doptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      };
    },
  },
  mounted() {
    // add an event listener to metrics created event
    this.establishConnection();
  },
  methods: {
    establishConnection() {
      feathersClient.service('metrics').on('created', (data) => {
        console.log('Receiving data from server: ', JSON.stringify(data));
        // update variables to the data received from the server
        this.messageCount = data.messageCount;
        this.recentLogins = data.recentLogins;
        this.activeChatRooms = data.activeChatRooms;
        this.openTickets = data.openTickets;
        this.closedTickets = data.closedTickets;
        this.unassignedTickets = data.unassignedTickets;
        this.serverMessage = data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main.home {
  padding-top: 100px;
  padding-bottom: 100px;
}

main.home img.logo {
  width: 100%;
  max-width: 400px;
}

main.home h3.title {
  color: #969696;
  font-weight: 100;
  text-transform: uppercase;
  margin-bottom: 40px;
}

main.home .button.login,
main.home .button.signup {
  padding-top: 1.2em;
  padding-bottom: 1.2em;
}

main.home .button.login {
  background: none;
  border: 2px solid #cfcfcf;
  color: #999;
}

main.home .button.login:hover,
main.home .button.login:focus {
  background: none;
  border: 2px solid #31d8a0;
  color: #31d8a0;
}
</style>
