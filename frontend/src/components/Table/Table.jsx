// import React from "react";

// const Table = () => {
//   var sampletext = `<style>
//   table { border-collapse: collapse; margin: 25px auto; font-size: 0.9em; width: 100%; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
//   th, td { padding: 12px 15px; border: 1px solid #ddd; }
//   thead tr { background-color: #009879; color: #ffffff; text-align: left; }
//   tbody tr:nth-child(even) { background-color: #f3f3f3; }
//   tbody tr { border-bottom: 1px solid #dddddd; }
// </style>
// <table>
//   <thead>
//     <tr>
//       <th>Date</th>
//       <th>Price</th>
//       <th>Bedrooms</th>
//       <th>Bathrooms</th>
//       <th>Sqft Living</th>
//       <th>Sqft Lot</th>
//       <th>Floors</th>
//       <th>Waterfront</th>
//       <th>View</th>
//       <th>Condition</th>
//       <th>Sqft Above</th>
//       <th>Sqft Basement</th>
//       <th>Yr Built</th>
//       <th>Yr Renovated</th>
//       <th>Street</th>
//       <th>City</th>
//       <th>Statezip</th>
//       <th>Country</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>02-05-2014 00:00</td>
//       <td>313000.0</td>
//       <td>3.0</td>
//       <td>NaN</td>
//       <td>1340</td>
//       <td>7912</td>
//       <td>1.5</td>
//       <td>0</td>
//       <td>0</td>
//       <td>3</td>
//       <td>1340</td>
//       <td>0</td>
//       <td>1955</td>
//       <td>2005</td>
//       <td>18810 Densmore Ave N</td>
//       <td>Shoreline</td>
//       <td>WA 98133</td>
//       <td>USA</td>
//     </tr>
//     <tr>
//       <td>02-05-2014 00:00</td>
//       <td>2384000.0</td>
//       <td>5.0</td>
//       <td>NaN</td>
//       <td>3650</td>
//       <td>9050</td>
//       <td>2.0</td>
//       <td>0</td>
//       <td>4</td>
//       <td>5</td>
//       <td>3370</td>
//       <td>280</td>
//       <td>1921</td>
//       <td>0</td>
//       <td>709 W Blaine St</td>
//       <td>Seattle</td>
//       <td>WA 98119</td>
//       <td>USA</td>
//     </tr>
//     <tr>
//       <td>02-05-2014 00:00</td>
//       <td>342000.0</td>
//       <td>NaN</td>
//       <td>2.0</td>
//       <td>1930</td>
//       <td>11947</td>
//       <td>1.0</td>
//       <td>0</td>
//       <td>0</td>
//       <td>4</td>
//       <td>1930</td>
//       <td>0</td>
//       <td>1966</td>
//       <td>0</td>
//       <td>26206-26214 143rd Ave SE</td>
//       <td>Kent</td>
//       <td>WA 98042</td>
//       <td>USA</td>
//     </tr>
//     <tr>
//       <td>02-05-2014 00:00</td>
//       <td>420000.0</td>
//       <td>NaN</td>
//       <td>2.0</td>
//       <td>2000</td>
//       <td>8030</td>
//       <td>1.0</td>
//       <td>0</td>
//       <td>0</td>
//       <td>4</td>
//       <td>1000</td>
//       <td>1000</td>
//       <td>1963</td>
//       <td>0</td>
//       <td>857 170th Pl NE</td>
//       <td>Bellevue</td>
//       <td>WA 98008</td>
//       <td>USA</td>
//     </tr>
//     <tr>
//       <td>02-05-2014 00:00</td>
//       <td>550000.0</td>
//       <td>NaN</td>
//       <td>2.0</td>
//       <td>1940</td>
//       <td>10500</td>
//       <td>1.0</td>
//       <td>0</td>
//       <td>0</td>
//       <td>4</td>
//       <td>1140</td>
//       <td>800</td>
//       <td>1976</td>
//       <td>1992</td>
//       <td>9105 170th Ave NE</td>
//       <td>Redmond</td>
//       <td>WA 98052</td>
//       <td>USA</td>
//     </tr>
//   </tbody>
// </table>`;

//   return (
//     <>
//       <div>Table</div>
//       <div dangerouslySetInnerHTML={{ __html: sampletext }} />
//     </>
//   );
// };

// export default Table;

import React from "react";

const Table = () => {
  var sampletext = `<style>
  table { border-collapse: collapse; margin: 25px auto; font-size: 0.9em; width: 100%; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
  th, td { padding: 12px 15px; border: 1px solid #ddd; }
  thead tr { background-color: #009879; color: #ffffff; text-align: left; }
  tbody tr:nth-child(even) { background-color: #f3f3f3; }
  tbody tr { border-bottom: 1px solid #dddddd; }
</style>
<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Price</th>
      <th>Bedrooms</th>
      <th>Bathrooms</th>
      <th>Sqft Living</th>
      <th>Sqft Lot</th>
      <th>Floors</th>
      <th>Waterfront</th>
      <th>View</th>
      <th>Condition</th>
      <th>Sqft Above</th>
      <th>Sqft Basement</th>
      <th>Yr Built</th>
      <th>Yr Renovated</th>
      <th>Street</th>
      <th>City</th>
      <th>Statezip</th>
      <th>Country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>02-05-2014 00:00</td>
      <td>313000.0</td>
      <td>3.0</td>
      <td>NaN</td>
      <td>1340</td>
      <td>7912</td>
      <td>1.5</td>
      <td>0</td>
      <td>0</td>
      <td>3</td>
      <td>1340</td>
      <td>0</td>
      <td>1955</td>
      <td>2005</td>
      <td>18810 Densmore Ave N</td>
      <td>Shoreline</td>
      <td>WA 98133</td>
      <td>USA</td>
    </tr>
    <tr>
      <td>02-05-2014 00:00</td>
      <td>2384000.0</td>
      <td>5.0</td>
      <td>NaN</td>
      <td>3650</td>
      <td>9050</td>
      <td>2.0</td>
      <td>0</td>
      <td>4</td>
      <td>5</td>
      <td>3370</td>
      <td>280</td>
      <td>1921</td>
      <td>0</td>
      <td>709 W Blaine St</td>
      <td>Seattle</td>
      <td>WA 98119</td>
      <td>USA</td>
    </tr>
    <tr>
      <td>02-05-2014 00:00</td>
      <td>342000.0</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>1930</td>
      <td>11947</td>
      <td>1.0</td>
      <td>0</td>
      <td>0</td>
      <td>4</td>
      <td>1930</td>
      <td>0</td>
      <td>1966</td>
      <td>0</td>
      <td>26206-26214 143rd Ave SE</td>
      <td>Kent</td>
      <td>WA 98042</td>
      <td>USA</td>
    </tr>
    <tr>
      <td>02-05-2014 00:00</td>
      <td>420000.0</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>2000</td>
      <td>8030</td>
      <td>1.0</td>
      <td>0</td>
      <td>0</td>
      <td>4</td>
      <td>1000</td>
      <td>1000</td>
      <td>1963</td>
      <td>0</td>
      <td>857 170th Pl NE</td>
      <td>Bellevue</td>
      <td>WA 98008</td>
      <td>USA</td>
    </tr>
    <tr>
      <td>02-05-2014 00:00</td>
      <td>550000.0</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>1940</td>
      <td>10500</td>
      <td>1.0</td>
      <td>0</td>
      <td>0</td>
      <td>4</td>
      <td>1140</td>
      <td>800</td>
      <td>1976</td>
      <td>1992</td>
      <td>9105 170th Ave NE</td>
      <td>Redmond</td>
      <td>WA 98052</td>
      <td>USA</td>
    </tr>
  </tbody>
</table>`;

  return (
    <>
      <div>Table</div>
      <div
        style={{
          overflowX: "auto",
          maxWidth: "50%",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: sampletext }} />
      </div>
    </>
  );
};

export default Table;
