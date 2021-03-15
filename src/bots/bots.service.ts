import { Injectable } from '@nestjs/common';
import { GiphyFetch } from '@giphy/js-fetch-api';
const gf = new GiphyFetch(process.env.GIPHY_API_KEY)
@Injectable()
export class BotsService {
    
    async findAll(keyword: string) {
        try {
            return await gf.search(keyword,{sort: 'relevant', lang:'en', limit:25, type:'gifs'})
        } catch (error) {
            console.error(`search`,error)
        }
    }
}
