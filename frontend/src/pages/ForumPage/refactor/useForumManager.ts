import {useState, 
    useMemo, 
    useEffect, 
    useCallback
} from 'react';

import { Topic } from '../../../types/Forum';


// -----Import Hooks-----
import useFetchTopic from '../../../hooks/topic/useFetchTopic';
import useCreateTopic from '../../../hooks/topic/useCreateTopic';
import usePinTopic from '../../../hooks/topic/usePinTopic';

export const useForumManager = () => {
    const [localTopics, setLocalTopics] = useState<Topic[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // 
    const {topics: serverTopics, fetchTopics} = useFetchTopic();
    const {topicCreate} = useCreateTopic();
    const {topicPin} = usePinTopic();

    useEffect(() => {
        fetchTopics();
    }, []);

    useEffect(() => {
        if (serverTopics) setLocalTopics(serverTopics);
    }, [serverTopics]);

    // -----Search Action-----
    const filteredTopics = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return localTopics.filter(t => 
            t.Title.toLowerCase().includes(term) ||
            t.Description.toLowerCase().includes(term)
        );
    }, [localTopics, searchTerm]);

    const pinnedTopics = useMemo(() => filteredTopics.filter(t => t.Pinned), [filteredTopics]);
    const otherTopics = useMemo(() => filteredTopics.filter(t => !t.Pinned), [filteredTopics]);

    // -----CRUD Action-----
    const handleCreate = async(title: string, description: string) => {
        
    }
}