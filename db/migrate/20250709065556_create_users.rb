class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :phone
      t.string :password_digest, null: false
      t.integer :gender, default: 0
      t.string :avatar
      t.integer :role, default: 0, null: false  # 0普通用户，1管理员

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :phone, unique: true
  end
end