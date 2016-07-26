public class GenericRepository<TEntity, TContext> : IDisposable
    where TEntity : class
    where TContext : DbContext, new()
{
    #region Fields

    protected DbContext Context;
    private bool _disposed;

    #endregion

    #region Constructor

    public BaseRepository()
    {
        this.Context = new TContext();
    }

    #endregion

    #region Methods

    #region Find

    //public TEntity Find(int id)
    //{
    //    return this.Context.Set<TEntity>().Find(id);
    //}

    #endregion Find

    #region List

    public List<TEntity> List()
    {
        return Context.Set<TEntity>().ToList();
    }

    public List<TEntity> List(int page, int pageSize)
    {
        var model = List()
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        return model;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="page"></param>
    /// <returns></returns>
    //public List<TEntity> List(int page)
    //{
    //    var pageSize = PaginationHelper.GlobalPageSize;

    //    var model = List()
    //        .Skip((page - 1) * pageSize)
    //        .Take(pageSize)
    //        .ToList();
    //    return model;
    //}

    //public List<TEntity> List(List<string> filters)
    //{
    //    var model = Context.Database.SqlQuery<TEntity>(SearchBuilder.BuildQuery<TEntity>(filters)).ToList();

    //    return model;
    //}

    #endregion List

    #region Limit

    public List<TEntity> Limit(int size)
    {
        var model = this.List()
            .Take(size)
            .ToList();
        return model;
    }

    #endregion Limit

    #region Count

    public int Count()
    {
        return this.Context.Set<TEntity>().Count();
    }

    #endregion Count

    #region Add

    public virtual TEntity Add(TEntity item)
    {
        return this.Context.Set<TEntity>().Add(item).Entity;
    }

    #endregion Add

    #region Remove

    public virtual void Remove(TEntity item)
    {
        this.Context.Set<TEntity>().Remove(item);
    }

    //public virtual void RemoveById(int id)
    //{
    //    var item = this.Find(id);
    //    if (item != null)
    //        Remove(item);
    //}

    #endregion Remove

    #region Edit

    public virtual void Edit(TEntity item)
    {
        this.Context.Entry(item).State = EntityState.Modified;
    }

    #endregion Edit

    #region Save

    public void Save()
    {
        this.Context.SaveChanges();
    }

    #endregion Save

    #region Dispose

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                this.Context.Dispose();
            }
        }
        _disposed = true;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    #endregion Dispose

    #endregion Methods
}