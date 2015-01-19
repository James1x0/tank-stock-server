/*
  Data Normalization Procedures
  ---
  Map & munge data
*/

/* Private */
function prefixType ( type, data, meta ) {
  var o = {};

  o[ type ] = data;

  if( meta ) {
    o.meta = meta;
  }

  return o;
}
