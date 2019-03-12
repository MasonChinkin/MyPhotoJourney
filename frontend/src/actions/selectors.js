
export const getUserJourneys = (userId, journeys) => {
    const res = [];
    Object.keys(journeys).forEach(journeyId => {
        if(journeys[journeyId].userId === userId){
            res.push(journeys[journeyId]);
        }
    });
    return res;
};