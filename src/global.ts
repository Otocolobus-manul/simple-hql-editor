export interface FieldInfo {
    name: string;
    type: 'string' | 'number';
    description: string;
}

export default {
    metaInfo: {
        fields: []
    } as {
        fields: FieldInfo[]
    }
};
