import Portfolio from "../models/portfolio.model.js";

class Filter {
    async filter(type, languages, hashtag) {
        throw new Error("filter() must be implemented by subclasses");
    }
}

class TypeFilter extends Filter {
    static instance = null;

    static getInstance() {
        if (!TypeFilter.instance) {
            TypeFilter.instance = new TypeFilter();
        }
        return TypeFilter.instance;
    }

    async filter(type, languages, hashtag) {
        if (!type) return []; // If no type is provided, return an empty array
        return Portfolio.find({ type }).exec(); 
    }
}

class LanguageFilter extends Filter {
    static instance = null;

    static getInstance() {
        if (!LanguageFilter.instance) {
            LanguageFilter.instance = new LanguageFilter();
        }
        return LanguageFilter.instance;
    }

    async filter(type, languages, hashtag) {
        if (!languages || languages.length === 0) return []; // If no languages are provided, return an empty array
        return Portfolio.find({ language: { $in: languages } }).exec(); 
    }
}

class HashtagFilter extends Filter {
    static instance = null;

    static getInstance() {
        if (!HashtagFilter.instance) {
            HashtagFilter.instance = new HashtagFilter();
        }
        return HashtagFilter.instance;
    }

    async filter(category, languages, hashtags) {
        if (!hashtags || hashtags.length === 0) return []; // Return an empty array if no hashtags are provided
        return Portfolio.find({ tags: { $in: hashtags } }).exec(); // Match any of the hashtags
    }
}


// Context class for filtering
class PostFilterContext {
    constructor() {
        this.strategies = []; // List to hold filter strategies
    }

    setStrategy(strategy) {
        this.strategies.push(strategy);
    }

    async filter(type, languages, hashtag) {
        // If no filter criteria are provided, return all portfolio items
        if (!type && (!languages || languages.length === 0) && !hashtag) {
            return Portfolio.find().exec();
        }

        let posts = []; // Initialize an empty array for post IDs

        for (const strategy of this.strategies) {
            const filteredPosts = await strategy.filter(type, languages, hashtag);
            posts = [...new Set([...posts, ...filteredPosts.map(post => post._id)])];
        }

        return Portfolio.find({ _id: { $in: posts } }).exec();
    }
}

export { Filter, TypeFilter, LanguageFilter, HashtagFilter, PostFilterContext };
