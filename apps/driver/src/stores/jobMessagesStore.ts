import { create } from "zustand";

export type MessageSenderRole = "CUSTOMER" | "PRIMARY_DRIVER" | "HELPER";

export type MessageDeliveryStatus =
	| "QUEUED"
	| "SUBMITTED"
	| "DELIVERED"
	| "READ"
	| "FAILED";

export interface JobMessage {
	id: string;
	jobId: string;
	senderRole: MessageSenderRole;
	senderName: string;
	time: string;
	content: string;
	contentEs?: string;
	status: MessageDeliveryStatus;
}

export interface JobAttachment {
	id: string;
	jobId?: string;
	type: "VOICE" | "IMAGE";
	duration?: string;
	titleEn: string;
	titleEs: string;
	subtitleEn: string;
	subtitleEs: string;
}

export interface JobMessagesState {
	currentJobId: string;
	messages: JobMessage[];
	attachments: JobAttachment[];
	lastSubmittedMessageId: string | null;

	// Actions
	setCurrentJobId: (jobId: string) => void;
	getJobMessages: (jobId?: string) => JobMessage[];
	getJobAttachments: (jobId?: string) => JobAttachment[];
	sendMessage: (
		content: string,
		senderRole?: MessageSenderRole,
		senderName?: string,
		jobId?: string,
	) => JobMessage;
	retryMessage: (messageId: string) => boolean;
	failMessage: (messageId: string) => void;
	setMessageStatus: (messageId: string, status: MessageDeliveryStatus) => void;
	resetMessages: () => void;
}

export const INITIAL_JOB_MESSAGES: JobMessage[] = [
	{
		id: "msg-01",
		jobId: "HX-AZ-DEMO-0042",
		senderRole: "CUSTOMER",
		senderName: "Customer",
		time: "10:24 AM",
		content: "The sofa is beside the front door. Please call when you arrive.",
		contentEs: "El sofá está junto a la puerta principal. Llámame al llegar.",
		status: "READ",
	},
	{
		id: "msg-02",
		jobId: "HX-AZ-DEMO-0042",
		senderRole: "PRIMARY_DRIVER",
		senderName: "You",
		time: "10:25 AM",
		content: "Thanks, I am on the way.",
		contentEs: "Gracias, ya voy en camino.",
		status: "READ",
	},
];

export const INITIAL_ATTACHMENTS: JobAttachment[] = [
	{
		id: "att-voice",
		jobId: "HX-AZ-DEMO-0042",
		type: "VOICE",
		duration: "0:24",
		titleEn: "Recorded voice note",
		titleEs: "Nota de voz grabada",
		subtitleEn: "0:24 · asynchronous voice note",
		subtitleEs: "Toca para reproducir · 0:24 · asíncrono",
	},
	{
		id: "att-photo",
		jobId: "HX-AZ-DEMO-0042",
		type: "IMAGE",
		titleEn: "Photo attached to job conversation",
		titleEs: "Foto adjunta a la conversación",
		subtitleEn: "Visible to authorized job participants only",
		subtitleEs: "Solo visible para participantes autorizados",
	},
];

export const useJobMessagesStore = create<JobMessagesState>((set, get) => ({
	currentJobId: "HX-AZ-DEMO-0042",
	messages: [...INITIAL_JOB_MESSAGES],
	attachments: [...INITIAL_ATTACHMENTS],
	lastSubmittedMessageId: "msg-02",

	setCurrentJobId: (jobId) => set({ currentJobId: jobId }),

	getJobMessages: (jobId) => {
		const s = get();
		const targetId = jobId || s.currentJobId;
		return s.messages.filter((m) => m.jobId === targetId);
	},

	getJobAttachments: (jobId) => {
		const s = get();
		const targetId = jobId || s.currentJobId;
		return s.attachments.filter((a) => !a.jobId || a.jobId === targetId);
	},

	sendMessage: (
		content,
		senderRole = "PRIMARY_DRIVER",
		senderName = "You",
		jobId,
	) => {
		const s = get();
		const targetJobId = jobId || s.currentJobId;
		const newMsg: JobMessage = {
			id: `msg-${Date.now().toString().slice(-6)}`,
			jobId: targetJobId,
			senderRole,
			senderName,
			time: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
			content,
			status: "SUBMITTED",
		};

		set((state) => ({
			messages: [...state.messages, newMsg],
			lastSubmittedMessageId: newMsg.id,
		}));

		return newMsg;
	},

	retryMessage: (messageId) => {
		const s = get();
		const target = s.messages.find((m) => m.id === messageId);
		if (!target) return false;

		set((state) => ({
			messages: state.messages.map((m) =>
				m.id === messageId ? { ...m, status: "SUBMITTED" } : m,
			),
			lastSubmittedMessageId: messageId,
		}));
		return true;
	},

	failMessage: (messageId) => {
		set((state) => ({
			messages: state.messages.map((m) =>
				m.id === messageId ? { ...m, status: "FAILED" } : m,
			),
		}));
	},

	setMessageStatus: (messageId, status) => {
		set((state) => ({
			messages: state.messages.map((m) =>
				m.id === messageId ? { ...m, status } : m,
			),
		}));
	},

	resetMessages: () =>
		set({
			currentJobId: "HX-AZ-DEMO-0042",
			messages: [...INITIAL_JOB_MESSAGES],
			attachments: [...INITIAL_ATTACHMENTS],
			lastSubmittedMessageId: "msg-02",
		}),
}));
