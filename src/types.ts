export type userData = {
	id: string;
	img: string;
	nombre: string;
	bio: string;
	description: string;
};

export type groupe = {
	id: string;
	img: string;
	participants: userData[];
	name: string;
	description: string;
	bio: string;
};

export type notificationFalta = {
	creator: userData;
	target: userData;
	reach: number;
	positiveVotes: number;
	negativeVotes: number;
	groupeId: string;
	idNotif: string;
};
