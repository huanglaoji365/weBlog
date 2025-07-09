class AddPlainPasswordToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :plain_password, :string
  end
end
