import React from 'react';

const Rank =({userName, userEntries}) =>{
	return(
	<div >
      <div className="white f3 center">
       {userName }
       {', your current number of entries are ....'}
      </div>
      <div className="white f1 center">
       {'#'}{userEntries}
      </div>
    </div>
	)
}

export default Rank;