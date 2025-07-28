
import Description from "./Description.svelte"
import MicroInfluence from "./MicroInfluence.svelte"

export const events= [
    { 
        id: 'micro-influencer', label: '인스타그램 피드 이벤트 참여',
        detail: '참여를 원하시면 이벤트를 체크해 주시고, 아래 버튼을 클릭해 신청서를 작성해서 참여해주세요.<br>' 
    },
    // { 
    //     id: 'ad-view', label: '광고 확인',
    //     detail: '광고가 사용자에게 표시되었는지 확인합니다.'
    // },
]

export const events_info= {
    component: MicroInfluence
}

export const reviewers_info= {
    component: Description
}