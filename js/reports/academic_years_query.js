import graphql from "../graphql";


function makeYearsQuery() {
    return graphql.query(`
    {
        academic_years {
            academic_year_start
        }
    }
    `);
}

export default makeYearsQuery;