using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SMSTransport.smstransport
{
    public partial class smstransportContext : DbContext
    {
        public smstransportContext()
        {
        }

        public smstransportContext(DbContextOptions<smstransportContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Test> Test { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySQL("server=localhost;user id=root;database=smstransport");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Test>(entity =>
            {
                entity.ToTable("test", "smstransport");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Age)
                    .HasColumnName("age")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Isactive)
                    .HasColumnName("isactive")
                    .HasColumnType("tinyint(1)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });
        }
    }
}
