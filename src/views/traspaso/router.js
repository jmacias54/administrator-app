import Traspaso from '@/views/traspaso/Traspaso.vue';
import Previo from '@/views/traspaso/certificacion/Previo.vue'
import Monitoreo from '@/views/traspaso/certificacion/Monitoreo.vue'


export default {
    path: 'traspaso',
    component: Traspaso,
    meta: {
        name: 'traspaso',
        breadcrumb: 'traspaso',
    },
    children: [

    {
            path: '/certificacion/previo',
            name: 'traspaso-certificacion-previo',
            meta: {
                text: 'Previo Certificaci&oacute;n',
            },
            component: Previo,

        },
        {
            path: '/certificacion/monitoreo',
            name: 'traspaso-certificacion-monitoreo',
            meta: {
                text: 'Monitoreo Certificaci&oacute;n',
            },
            component: Monitoreo,


        },

    ],
};
