class Site < ApplicationRecord
  belongs_to :user
  validates :url, presence: true, length: {maximum: 200}
  validates :duration, presence: true, length: {maximum: 9}

end
