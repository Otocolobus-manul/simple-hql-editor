export default {
    'GET /database/some_table/meta_info': {
        fields: [
            {
                name: 'src_ip',
                type: 'string',
                description: '源地址',
            },
            {
                name: 'src_port',
                type: 'number',
                description: '源端口',
            },
            {
                name: 'dst_ip',
                type: 'string',
                description: '目标地址',
            },
            {
                name: 'dst_port',
                type: 'number',
                description: '目标端口',
            }
        ]
    }
}
