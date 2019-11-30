new Vue({
    el: '#app',

    data: {
        map: null,
        titleLayer: null, // Initialisation des données : null titres des calques
        layers: [
            {
                id: 0,
                name: 'Porte de Champeret',
                type: 'marker',
                coords: [48.885495, 2.293116],
                active: false,
            },
            {
                id:1,
                name: 'Notre Dame',
                type:'marker',
                coords: [48.852810, 2.350384],
                active: false,
            },
            
        ],
    },

    mounted() {
        this.initMap(); // build init pour la carte et init des calques 
        this.initLayers();
    },

    methods: {
        initMap() {
            this.map = L.map('map').setView([48.856697, 2.351462], 12);
            this.tileLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
                    {
                        maxZoom: 18,
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">Map</a>, &copy; <a href="https://carto.com/attribution">Carte</a>',
                    }
                );
            this.tileLayer.addTo(this.map);
        },

        initLayers() {
            this.layers.forEach((layer) =>
            {
                layer.leafletObject = L.marker(layer.coords).bindPopup(layer.name).openPopup();
            });
        },// méthodes exécutées 
        layerChanged(layerId,active) {
            const layer = this.layers.find(layer => layer.id === layerId);
                if (active) 
                {
                    layer.leafletObject.addTo(this.map);
                } 
                else 
                {
                    layer.leafletObject.removeFrom(this.map);
                }
        }, 
    },
});