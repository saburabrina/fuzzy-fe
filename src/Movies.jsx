import { 
    useQuery 
} from "@tanstack/react-query";
import axios from "axios";

import { ExcelExport } from "@progress/kendo-react-excel-export";
import { 
    Grid,
    GridColumn as Column,
} from "@progress/kendo-react-grid"

function Movies() {
    const { isLoading, error, data } = useQuery({
        queryFn: ()=> {
            return axios.get("http://localhost:3000/movies", { withCredentials: true, headers: { Accept: "application/json" }})
            .then(res => res.data)
            .catch(err => console.log(err));
        },
        queryKey: ['movies']
    });

    if (isLoading) return <>{"Loading"}</>;

    if (error) return <>{"Error"}</>;

    return (
        <>
            <div>
               <ExcelExport
                data={data}
               >
                    <Grid
                        data={data}
                    >
                        <Column
                            field={"title"}
                            title={"Title"}
                            
                        />
                        <Column
                            field={"director"}
                            title={"Director"}
                            
                        />
                        <Column
                            field={"average_score"}
                            title={"average_score"}
                            
                        />
                    </Grid>
               </ExcelExport>
            </div>
        </>
    )
}

export default Movies;