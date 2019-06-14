import {
    faFacebookSquare,
    faGithubSquare,
    faKeybase,
    faRedditSquare,
    faTelegram,
    faTwitterSquare,
    faWeixin,
    faYoutubeSquare
} from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";

export default {
    APP_NAME: "EosDev",
    // API: "https://api-dsp.eos.dev",
    API: "http://localhost:8081",
    NETWORK: {
        blockchain: "eos",
        chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
        host: "public.eosinfra.io",
        port: 443,
        protocol: "https"
    },
    REQUIRED_FIELDS: {
        accounts: [
            {
                blockchain: "eos",
                host: "public.eosinfra.io",
                port: 443,
                chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
            }
        ]
    },
    WALLETS: [
        'scatter', 
        'ledger',
        'lynx',
        'meetone',
        'tokenpocket',
    ],
    DAPP_ENDPOINT: "https://public.eosinfra.io",
    ASSETS: {
        DAPP: 'dappservices',
        DAPPHDL: 'dappairhodl1'
    },
    SERVICES: [
        {
            caption: "IPFS",
            value: "ipfsservice1"
        },
        {
            caption: "Stake",
            value: "stakeservice"
        },
        {
            caption: "Cron",
            value: "cronservices"
        },
        {
            caption: "Oracle",
            value: "oracleservic"
        }
    ],
    SOCIAL_MEDIA: {
        facebook: {
            url: 'https://www.facebook.com',
            icon: faFacebookSquare,
            pre_text: '',
        },
        github: {
            url: 'https://github.com',
            icon: faGithubSquare,
            pre_text: '',
        },
        keybase: {
            url: 'https://keybase.io',
            icon: faKeybase,
            pre_text: '',
        },
        reddit: {
            url: 'https://www.reddit.com',
            icon: faRedditSquare,
            pre_text: 'u/',
        },
        steemit: {
            url: 'https://steemit.com',
            icon: faExternalLinkSquareAlt,
            pre_text: '@'
        },
        telegram: {
            url: 'https://t.me',
            icon: faTelegram,
            pre_text: '',
        },
        twitter: {
            url: 'https://twitter.com',
            icon: faTwitterSquare,
            pre_text: '',
        },
        wechat: {
            url: 'weixin://contacts/profile',
            icon: faWeixin,
            pre_text: '',
        },
        youtube: {
            url: 'https://www.youtube.com',
            icon: faYoutubeSquare,
            pre_text: '',
        },
    }
    
};
