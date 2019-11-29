new Vue({
    el: '#app',

    data: {
        map: null,
        titleLayer: null, // Initialisation des données : null et vide pour les calques
        layers: [],
    },

    mounted() {
        this.initMap(); // build init pour la carte et init des calques 
        this.initLayers();
    },

    methods: {
        initMap() {
            this.map = L.map('map').setView([50.633333, 3.066667], 12);
            this.tileLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
                    {
                        maxZoom: 18,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">Map</a>, &copy; <a href="https://carto.com/attribution">Carte</a>',
                    }
                );
            this.tileLayer.addTo(this.map);
        },

        initLayers() {}, // méthodes exécutées
    },
});