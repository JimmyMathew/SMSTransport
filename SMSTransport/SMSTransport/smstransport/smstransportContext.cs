﻿using System;
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

        public virtual DbSet<Driver> Driver { get; set; }
        public virtual DbSet<Party> Party { get; set; }
        public virtual DbSet<Test> Test { get; set; }
        public virtual DbSet<Vehicle> Vehicle { get; set; }

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
            modelBuilder.Entity<Driver>(entity =>
            {
                entity.ToTable("driver", "smstransport");

                entity.Property(e => e.Driverid)
                    .HasColumnName("driverid")
                    .HasColumnType("bigint(20)");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Createdby)
                    .HasColumnName("createdby")
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Createdon)
                    .HasColumnName("createdon")
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Drivername)
                    .IsRequired()
                    .HasColumnName("drivername")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Mobile)
                    .HasColumnName("mobile")
                    .HasColumnType("bigint(20)")
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Updatedby)
                    .HasColumnName("updatedby")
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Updatedon)
                    .HasColumnName("updatedon")
                    .HasDefaultValueSql("NULL");
            });

            modelBuilder.Entity<Party>(entity =>
            {
                entity.ToTable("party", "smstransport");

                entity.Property(e => e.Partyid)
                    .HasColumnName("partyid")
                    .HasColumnType("bigint(15)");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Createdby)
                    .HasColumnName("createdby")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Createdon)
                    .HasColumnName("createdon")
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Gstin)
                    .HasColumnName("gstin")
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Mobile)
                    .HasColumnName("mobile")
                    .HasColumnType("bigint(15)")
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Pancard)
                    .HasColumnName("pancard")
                    .HasMaxLength(25)
                    .IsUnicode(false)
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Partyname)
                    .IsRequired()
                    .HasColumnName("partyname")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Partytype)
                    .IsRequired()
                    .HasColumnName("partytype")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Telephone)
                    .HasColumnName("telephone")
                    .HasColumnType("bigint(15)")
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Updatedby)
                    .HasColumnName("updatedby")
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Updatedon)
                    .HasColumnName("updatedon")
                    .HasDefaultValueSql("NULL");
            });

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

            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.HasKey(e => e.Veicleid);

                entity.ToTable("vehicle", "smstransport");

                entity.Property(e => e.Veicleid)
                    .HasColumnName("veicleid")
                    .HasColumnType("bigint(20)");

                entity.Property(e => e.Createdby)
                    .HasColumnName("createdby")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Createdon)
                    .HasColumnName("createdon")
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Updatedby)
                    .HasColumnName("updatedby")
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Updatedon)
                    .HasColumnName("updatedon")
                    .HasDefaultValueSql("NULL");

                entity.Property(e => e.Vehicleno)
                    .IsRequired()
                    .HasColumnName("vehicleno")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Vehicletype)
                    .IsRequired()
                    .HasColumnName("vehicletype")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
        }
    }
}
