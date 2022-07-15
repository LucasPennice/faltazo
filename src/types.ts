export type userData = {
	id: string;
	img: string;
	nombre: string;
	bio: string;
	description: string;
};

export type groupeInfo = {
	id: string;
	name: string;
	description: string;
	bio: string;
	img: string;
	participants: userData[];
};

export type notification = {
	type: 'falta';
	solicitador: userData;
};

export const MOCKNOTIFICATION: notification[] = [
	{
		type: 'falta',
		solicitador: { id: '1', img: 'nvm', nombre: 'nelli', bio: 'nelli bio', description: 'nelli desc' },
	},
];

export const MOCKDATAGROUPE: groupeInfo[] = [
	{
		id: 'grp1',
		name: 'Lo goblins',
		description: 'retard',
		bio: 'muchos retars',
		img: 'nvm',
		participants: [
			{ id: '1', img: 'nvm', nombre: 'nelli', bio: 'nelli bio', description: 'nelli desc' },
			{ id: '2', img: 'nvm', nombre: 'sebas', bio: 'sebas bio', description: 'sebas desc' },
		],
	},
];
