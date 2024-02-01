class CreateSites < ActiveRecord::Migration[7.1]
  def change
    create_table :sites do |t|
      t.string :url
      t.string :duration
      t.datetime :expiration_date

      t.timestamps
    end
  end
end
