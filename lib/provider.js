import GenericRepository from 'elliptical-generic-repository'


class RepositoryProvider{
  constructor(key,$provider,filterProp){
    this.key=key;
    this.$provider=$provider;
    this._filterProp=filterProp;
    this._model=this._getPersistenceModel();
    this._repo = new GenericRepository(this._model);
    this._onChange(key,$provider);
  }

  get(params,resource,query,callback){
    this._repo.get(params,resource,query,callback);
  }

  post(params,resource,callback){
    params=this._onPost(params);
    this._repo.post(params,resource,callback);
  }

  put(params,resource,callback){
    params=this._onPut(params);
    this._repo.put(params,resource,callback);
  }

  delete(params,resource,callback){
    this._repo.delete(params,resource,callback);
  }
  
  query(filter, asEnumerable){
    var filterProp=this._filterProp;
    if(!filterProp) return model;
    var keys = Object.keys(filter);
    filter = filter[keys[0]];
    filter = filter.toLowerCase();
    var result = this.enumerable().Where(function (x) {
      return ((x[filterProp].toLowerCase().indexOf(filter) == 0) );
    });
    return result.ToArray();
  }
  
  enumerable(){
    return this._repo.Enumerable();
  }

  clear(callback){
    this._model=[];
    this._repo.model=[];
    if(callback) callback(null,[]);
  }
  
  _getPersistenceModel() {
    var model = this.$provider.get(this.key);
    if (model) return model;
    else return [];
  }
  
  _onChange(key,$provider){
    this._repo.onChange = function (model) {
      $provider.set(key, model);
    };
  }

  _onPost(params){
    return params;
  }

  _onPut(params){
    return params;
  }

}


export default RepositoryProvider;