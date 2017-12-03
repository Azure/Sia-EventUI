import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'


const dataSourceConfig = {
    text: 'name',
    value: 'id',
  }

export const AutoCompleteFilter = (props) => {
    return 
    (<div>
        <AutoComplete
                    floatingLabelText="Type 'r', case insensitive"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={props}
                    onNewRequest={(s,i)=>{console.log(s.id)}}
                    dataSourceConfig={dataSourceConfig}
        />
  </div>)
}

// export default AutoCompleteFilter